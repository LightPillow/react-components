import { DatafyProps } from './datafy'
import { Empty } from './empty'
import dayjs from 'dayjs'
import React, {
  useCallback, useEffect, useState
} from 'react'
import { Spinner } from 'spinner'

function renderData (field: DatafyProps, value: any, values: any) {
  if (field.render) return field.render(value, values) || <Empty />

  if (typeof value === 'undefined' || value === null) {
    return <Empty />
  }

  if (field.options) return field.options.find(o => o.value === value).label

  switch (field.type) {
    case 'minute':
      return dayjs(value).format('YYYY-MM-DD HH:mm')
    default:
      return value
  }
}

export function Detail (props: {
  className?: string
  style?: React.CSSProperties
  dataFrom?: [string, { [key: string]: any }]
  fields: DatafyProps[]
  extra?(props: {
    data: any
    reload(): void
  }): JSX.Element | null
}) {
  const [processedData, setProcessedData] = useState<any>()
  const [loading, setLoading] = useState(false)
  const reload = useCallback(() => {
    if (!props.dataFrom) return

    setLoading(true)

    window.faas(...props.dataFrom)
      .then(res => setProcessedData(res.data))
      .finally(() => setLoading(false))
  }, [])

  useEffect(function () {
    reload()
  }, [JSON.stringify(props.dataFrom)])

  return <div
    className={ props.className + ' space-y-2' }
    style={ props.style }>
    {loading && <Spinner noStyle />}
    {!loading && processedData && props.fields.map(f => <div
      key={ f.id }
      className='grid grid-cols-3'>
      <div className='text-gray-500'>{f.title || f.id}</div>
      <div className='col-span-2'>{renderData(f, processedData[f.id], processedData)}</div>
    </div>)}
    {!loading && processedData && props.extra && props.extra({
      data: processedData,
      reload
    })}
  </div>
}

import React from 'react'

export function Spinner (props: {
  noStyle?: boolean
  className?: string
  style?: React.CSSProperties
}) {
  return <div
    className={ props.noStyle ? null : `${props.className} fixed w-full` }
    style={ props.noStyle ? {} : {
      top: '46vh',
      ...props.style
    } }>
    <div className='animate-spin rounded-full h-6 w-6 border-t-2 border-blue-400 mx-auto'></div>
  </div>
}

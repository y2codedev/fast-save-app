"use client";

import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const NoSSRWrapper = (props: Props) => (
    <React.Fragment>{props.children}</React.Fragment>
)

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
    ssr: false
})
"use client";

import dynamic from 'next/dynamic'
import React, { ReactNode } from 'react'

type Props = {
    children: ReactNode
}

const NoSSRWrapper = (props: Props) => (
    <>{props?.children}</>
)

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
    ssr: false
})
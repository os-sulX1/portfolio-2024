 import type { JSX } from 'react'
import { highlight } from 'sugar-high'
import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc'
import type { ReactNode } from 'react';
import Counter from './counter';

interface CodeProps {
  children: ReactNode;
  [key: string]: unknown;
}
function Code({ children, ...props }: CodeProps) {
  const codeHTML = highlight(children as string)
  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />
}

const components = {
  code: Code,
  Counter
}

export default function MDXContent(
  props: JSX.IntrinsicAttributes & MDXRemoteProps
) {
  return (
    <MDXRemote
      {...props}
      components={{ ...components, ...(props.components as MDXRemoteProps['components'] || {}) }}
    />
  )
}
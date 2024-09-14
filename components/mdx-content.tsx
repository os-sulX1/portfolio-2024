import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote/rsc';
import Counter from './counter';

interface CodeProps extends React.HTMLAttributes<HTMLElement> {
  children?: React.ReactNode;
}

const highlight = (code: string) => {
  // Implement a basic syntax highlighter or use a different library
  return code.replace(/(const|let|var|function|return)/g, '<span class="keyword">$1</span>');
};

const Code: React.FC<CodeProps> = ({ children, ...props }) => {
  const codeHTML = children ? highlight(children.toString()) : '';
  // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
};

const components: React.ComponentProps<typeof MDXRemote>['components'] = {
  code: Code,
  Counter,
};

export default async function MDXContent({ source, options, components: propComponents }: MDXRemoteProps) {
  const mergedComponents = { ...components, ...(propComponents || {}) };

  return (
    <MDXRemote
      source={source}
      options={options}
      components={mergedComponents}
    />
  );
}
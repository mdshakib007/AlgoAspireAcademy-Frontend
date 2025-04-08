import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { ghcolors } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import clsx from 'clsx';
import { useEffect, useState } from 'react';


const CustomMarkdown = ({ children, className }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const Code = ({ node, inline, className, children, ...props }) => {
        const match = /language-(\w+)/.exec(className || '');

        return !inline && match ? (
            <div className="relative group my-6">
                <div className="absolute right-4 top-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                        onClick={() => navigator.clipboard.writeText(String(children))}
                        className="bg-gray-200/10 px-3 py-1 rounded-md text-sm text-gray-300 hover:bg-gray-200/20 backdrop-blur-sm border border-gray-700"
                    >
                        Copy
                    </button>
                </div>
                <SyntaxHighlighter
                    style={ghcolors}
                    language={match[1]}
                    PreTag="div"
                    className={clsx(
                        'rounded-lg p-4 text-sm bg-[#0d1117] border border-gray-800',
                        'font-mono overflow-x-auto',
                        className
                    )}
                    showLineNumbers
                    lineNumberStyle={{
                        color: '#6e7681',
                        minWidth: '2.5em',
                        paddingRight: '1em',
                        borderRight: '1px solid #30363d'
                    }}
                    {...props}
                >
                    {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
            </div>
        ) : (
            <code className={clsx(
                'bg-gray-800/50 px-1.5 py-0.5 rounded-md text-[#c9d1d9]',
                'font-mono text-sm border border-gray-700',
                className
            )} {...props}>
                {children}
            </code>
        );
    };

    return (
        <div className={clsx('markdown-body', className)}>
            {mounted && (
                <Markdown
                    remarkPlugins={[remarkGfm]}
                    rehypePlugins={[
                        rehypeHighlight,
                        rehypeSlug,
                        [rehypeAutolinkHeadings, { behavior: 'wrap' }]
                    ]}
                    components={{
                        // Headings with GitHub-like styling
                        h1: ({ node, ...props }) => (
                            <h1 className="text-2xl md:text-3xl font-bold my-6 pb-2 border-b border-gray-700" {...props} />
                        ),
                        h2: ({ node, ...props }) => (
                            <h2 className="text-xl md:text-2xl font-semibold my-5 pb-2 border-b border-gray-700" {...props} />
                        ),
                        h3: ({ node, ...props }) => (
                            <h3 className="text-lg md:text-xl font-medium my-4" {...props} />
                        ),
                        h4: ({ node, ...props }) => (
                            <h4 className="text-base md:text-lg font-medium my-3" {...props} />
                        ),

                        // Paragraphs
                        p: ({ node, ...props }) => (
                            <p className="text-gray-300 mb-4 leading-relaxed text-base" {...props} />
                        ),

                        // Code blocks (handled by Code component above)

                        // Links
                        a: ({ node, ...props }) => (
                            <a
                                className="text-yellow-500"
                                rel="noopener noreferrer"
                                {...props}
                            />
                        ),

                        // Images
                        img: ({ node, ...props }) => (
                            <div className="my-6">
                                <img
                                    {...props}
                                    className="mx-auto rounded-md object-contain"
                                    loading="lazy"
                                />
                                {props.alt && (
                                    <p className="text-center text-gray-400 text-sm mt-2">
                                        {props.alt}
                                    </p>
                                )}
                            </div>
                        ),

                        // Blockquotes
                        blockquote: ({ node, ...props }) => (
                            <blockquote
                                className="border-l-4 border-yellow-500 pl-4 my-4 text-gray-300 bg-gray-800/30 py-2 rounded-r"
                                {...props}
                            />
                        ),

                        // Lists
                        ul: ({ node, ...props }) => (
                            <ul className="list-disc pl-6 my-4 text-gray-300 space-y-2" {...props} />
                        ),
                        ol: ({ node, ...props }) => (
                            <ol className="list-decimal pl-6 my-4 text-gray-300 space-y-2" {...props} />
                        ),
                        li: ({ node, ...props }) => (
                            <li className="pl-2 text-gray-300" {...props} />
                        ),

                        // Tables
                        table: ({ node, ...props }) => (
                            <div className="overflow-x-auto my-6 rounded-lg border border-gray-700">
                                <table className="w-full border-collapse" {...props} />
                            </div>
                        ),
                        thead: ({ node, ...props }) => (
                            <thead className="bg-gray-800" {...props} />
                        ),
                        th: ({ node, ...props }) => (
                            <th
                                className="text-left py-3 px-4 border-b border-gray-700 font-semibold text-gray-300"
                                {...props}
                            />
                        ),
                        td: ({ node, ...props }) => (
                            <td
                                className="py-3 px-4 border-b border-gray-800 text-gray-300"
                                {...props}
                            />
                        ),

                        // Task lists
                        input: ({ node, ...props }) => (
                            <input
                                type="checkbox"
                                className="mr-2 rounded border-gray-500 bg-gray-800 checked:bg-yellow-500 focus:ring-yellow-500"
                                {...props}
                            />
                        ),

                        // Horizontal rule
                        hr: ({ node, ...props }) => (
                            <hr className="my-8 border-t border-gray-700" {...props} />
                        ),

                        // Strong text
                        strong: ({ node, ...props }) => (
                            <strong className="font-semibold text-gray-200" {...props} />
                        ),

                        // Emphasis
                        em: ({ node, ...props }) => (
                            <em className="italic text-gray-300" {...props} />
                        ),
                        code: ({ node, inline, className, children, ...props }) => {
                            const match = /language-(\w+)/.exec(className || '');
                            return !inline && match ? (
                                <div className="bg-gray-800 rounded-lg p-4 my-4 overflow-x-auto">
                                    <pre className="hljs" {...props}>
                                        {children}
                                    </pre>
                                </div>
                            ) : (
                                <code className="bg-gray-700 px-2 py-1 rounded text-red-400" {...props}>
                                    {children}
                                </code>
                            );
                        },

                    }}
                >
                    {children}
                </Markdown>
            )}
        </div>
    );
};

export default CustomMarkdown;
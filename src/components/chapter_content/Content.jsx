import MarkDown from "../MarkDown";

const Content = ({ currentTopic }) => {
    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold mb-4">{currentTopic.title}</h2>
            <div className="text-lg">
                {currentTopic.content?.map((item, index) => {
                    switch (item.type) {
                        case "header1":
                            return (
                                <h2
                                    key={index}
                                    className="text-3xl font-bold mt-6 mb-3"
                                >
                                    {item.content}
                                </h2>
                            );
                        case "header2":
                            return (
                                <h2
                                    key={index}
                                    className="text-2xl font-bold mt-6 mb-3"
                                >
                                    {item.content}
                                </h2>
                            );
                        case "header3":
                            return (
                                <h2
                                    key={index}
                                    className="text-xl font-bold mt-6 mb-3"
                                >
                                    {item.content}
                                </h2>
                            );
                        case "para":
                            return (
                                <p
                                    key={index}
                                    className="mb-4 leading-relaxed"
                                    dangerouslySetInnerHTML={{
                                        __html: item.content,
                                    }}
                                ></p>
                            );
                        case "code":
                            return (
                                <MarkDown
                                    key={index}
                                    content={item.content}
                                ></MarkDown>
                            );
                        case "points":
                            return (
                                <ul
                                    key={index}
                                    className="list-disc pl-6 mb-4 space-y-2"
                                >
                                    {Array.isArray(item.content) &&
                                        item.content.map((point, i) => (
                                            <li
                                                key={i}
                                                className="leading-relaxed"
                                            >
                                                <MarkDown content={point} />
                                            </li>
                                        ))}
                                </ul>
                            );
                        default:
                            return null;
                    }
                })}
            </div>
        </div>
    );
};

export default Content;

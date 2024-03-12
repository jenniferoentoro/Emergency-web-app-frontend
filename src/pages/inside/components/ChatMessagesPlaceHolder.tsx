const MessageReceived = (props:any) => {
    return (
        <div>
            <b>{props.from}</b>: {props.text} {props.direct ? <b>(direct)</b> : ''}
        </div>
    );
};

const ChatMessagesPlaceholder = (props:any) => {
    return (
        <>
            <h2>Messages:</h2>
            {props.messagesReceived
                .filter((message: { from: any; }) => message.from !== props.username)
                .map((message: { id: any; from: any; to: any; text: any; }) => <MessageReceived key={message.id} from={message.from} direct={message.to === props.username} text={message.text} />)}
        </>
    );
}

export default ChatMessagesPlaceholder;
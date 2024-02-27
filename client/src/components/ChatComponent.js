import react, { Component } from 'react';
import ChatBox from './helpers/ChatBox';

class ChatComponent extends Component {
	render() {
		if (this.props.chatComponentVisible) {
			return <ChatBox changeChatComponent={this.props.changeChatComponent} setScreen={this.props.setScreen} />;
		} else {
			return (
				<div onClick={() => this.props.changeChatComponent("click")} id="chat-comp-div">
					<i className="fas fa-comments fa-4x" style={{ color: "#002e6d" }}></i>
					<div id="chat-comp-div-two">
					</div>
					<div id="chat-comp-div-three">
					</div>
					
					<div id="chat-comp-div-five">
					</div>
				</div>
			);
		}
	}
}

export default ChatComponent;


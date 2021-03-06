/**
 * Created by kusob on 2017. 6. 28..
 */


import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableHighlight,
    View
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import PrivateAddr from '../common/private/address';
import Common from "../common/common";

export default class Inquire extends Component {
    constructor(props) {
        super(props);

        this.state = {
            content: '',
            senderEmail: '',
            loading: false,
        };
    }

    // sendMail(){
    //     if(this.state.content==""){
    //         alert('내용을 입력해주세요!');
    //         return false;
    //     }
    //     if(this.state.senderEmail==""){
    //         alert('답변 받을 이메일 주소를 입력해주세요!');
    //         return false;
    //     }
    //     this.setState({loading:true});
    //     fetch(PrivateAddr.getAddr()+'inquire', {
    //         method: 'POST',
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({
    //             content: this.state.content,
    //             senderEmail: this.state.senderEmail
    //         })
    //     }).then((response) => {return response.json()})
    //         .then((responseJson) => {
    //             if(responseJson.message=="SUCCESS"){
    //                 alert('성공적으로 메시지를 전송했습니다!');
    //                 Actions.main({goTo:'more'});
    //             } else {
    //                 alert('오류가 발생했습니다.\n다시 시도해주세요!');
    //             }
    //         })
    //         .catch((error) => {
    //             alert('Network Connection Failed');
    //             console.error(error);
    //         }).done(()=>this.setState({loading:false}));
    // }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.frame}>
                <Text style={styles.btnText}>
                    문의는 boseokjung@gmail.com 으로 해주세요!{'\n'}
                    혹은 구글스토어의 리뷰를 이용해주세요!{'\n'}
                    별 5개 주시면 복받으실꺼에요 ㅎㅎㅎ
                    </Text>
                {/*{this.state.loading&&*/}
                {/*<LoadingIcon/>*/}
                {/*}*/}
                {/*<TextInput*/}
                {/*style={styles.inputContent}*/}
                {/*multiline={true}*/}
                {/*numberOfLines={4}*/}
                {/*value={this.state.content}*/}
                {/*onChangeText={(content) => this.setState({content: content})}*/}
                {/*placeholder={'1000자 이내로 입력해주세요'}*/}
                {/*placeholderTextColor="#FFFFFF"*/}
                {/*autoCapitalize = 'none'*/}
                {/*maxLength={2000}*/}
                {/*autoFocus={true}*/}
                {/*/>*/}
                {/*<TextInput*/}
                {/*style={styles.input}*/}
                {/*value={this.state.senderEmail}*/}
                {/*onChangeText={(email) => this.setState({senderEmail: email})}*/}
                {/*keyboardType='email-address'*/}
                {/*placeholder={'답변 받을 이메일 주소'}*/}
                {/*placeholderTextColor="#FFFFFF"*/}
                {/*autoCapitalize = 'none'*/}
                {/*multiline={false}*/}
                {/*autoFocus={true}*/}
                {/*/>*/}
                {/*<TouchableHighlight*/}
                {/*style={styles.attachBtn}*/}
                {/*underlayColor={'#000000'}*/}
                {/*onPress={() => {this.sendMail()}}*/}
                {/*>*/}
                {/*<Text style={styles.btnText}>보내기</Text>*/}
                {/*</TouchableHighlight>*/}
                {/*<TouchableHighlight*/}
                {/*style={styles.rightBtn}*/}
                {/*underlayColor={'#000000'}*/}
                {/*onPress={() => this.sendMail()}*/}
                {/*>*/}
                {/*<Text style={styles.rightBtnText}>전송</Text>*/}
                {/*</TouchableHighlight>*/}
            </ScrollView>
        );
    }
}

const wid = Common.winWidth();
const hei = Common.winHeight();
var styles = StyleSheet.create({
    frame: {
        flex: 1,
        padding: 20,
        // paddingBottom:15*dpi,
    },
    inputContent: {
        width: 0.7 * wid,
        height: 350,
        fontSize: 15,
        color: '#FFFFFF',
        padding: 15,
        paddingTop: 15,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        marginBottom: 5,
        opacity: 0.7
    },
    input: { //입력칸
        width: 0.7 * wid,
        height: 0.7 * wid,
        fontSize: 15,
        color: '#FFFFFF',
        padding: 15,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: 'transparent',
        marginBottom: 5,
        opacity: 0.7
    },
    attachBtn: {
        width: 0.5 * wid,
        padding: 15,
        height: 40,
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent',
        opacity: 0.8
    },
    btnText: {
        textAlign: 'center',
        color: '#FFFFFF',
        opacity: 0.9,
        fontSize: 17,
    },
});

/**
 * Created by kusob on 2017. 7. 7..
 */

import React, { Component } from 'react';
import {
    ScrollView,
    StyleSheet,
    Text, TextInput, TouchableOpacity,
    View, AsyncStorage
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { observer } from 'mobx-react/native';
import Common from "../common/common";
import PrivateAddr from "../common/private/address";
import StateStore from '../common/stateStore';
import SelectBox from '../common/selectBox';

const MyWalletAdd = observer(class MyWalletAdd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            addr: '',
            TYPE: ['BTC', 'ETH', 'ETC', 'XRP', 'LTC', 'DASH'],
            currentTYPE: 0,
        };
    }

    static async addWallet() {
        const TYPE = ['BTC', 'ETH', 'ETC', 'XRP', 'LTC', 'DASH'];
        if (StateStore.walletName() == "") {
            alert("지갑 이름을 입력하세요!");
            return false;
        } else if (StateStore.walletAddr() == "") {
            alert("지갑 주소를 입력하세요!");
            return false;
        } else {
            await AsyncStorage.getItem('Token', (err, result) => {
                if (err != null) {
                    alert(err);
                    return false;
                }
                const token = JSON.parse(result).token;
                try {
                    //post api call
                    fetch(PrivateAddr.getAddr() + 'wallet/add', {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                            'Authorization': token
                        },
                        body: JSON.stringify({
                            walletName: StateStore.walletName(),
                            walletAddr: StateStore.walletAddr(),
                            walletType: TYPE[StateStore.walletType()],
                        })
                    }).then((response) => {
                        return response.json()
                    }).then((responseJson) => {
                        if (responseJson.message == "SUCCESS") {
                            alert('지갑을 추가했습니다!');
                            Actions.main({ goTo: 'myWallet' });
                        } else {
                            alert('오류가 발생했습니다.\n다시 시도해주세요!');
                        }
                    }).catch((error) => {
                        alert('Network Connection Failed');
                        console.error(error);
                    }).done();
                    StateStore.setName('');
                    StateStore.setType(0);
                    StateStore.setAddr('');
                } catch (err) {
                    alert('지갑추가실패 : ' + err);
                }
            });
        }
    }

    async componentDidMount() {
        await this.getWalletInfo();
    }

    async getWalletInfo() {
        try {
            const code = StateStore.walletAddr();
            if (code !== null) {
                await this.setState({ addr: code });
            }
            const type = StateStore.walletType();
            if (type != undefined) {
                await this.setState({ currentTYPE: type });
            } else {
                StateStore.setType(this.state.currentTYPE);
            }
            const name = StateStore.walletName();
            if (name !== null) {
                await this.setState({ name: name });
            }
        } catch (error) {
            alert('지갑 정보 가져오기 실패! : ' + error);
        }
    }

    async qrScanner() {
        try {
            await StateStore.setName(this.state.name);
            await StateStore.setType(this.state.currentTYPE);
            Actions.scanner();
        } catch (error) {
            console.error(error);
        }

    }

    setType(i) {
        this.setState({ currentTYPE: i }, () => {
            StateStore.setType(this.state.currentTYPE);
        });
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.frame}>
                <ScrollView contentContainerStyle={styles.content}>
                    <Text style={styles.explain}>
                        여기서 지갑을 추가해보세요!
                    </Text>
                    <TextInput
                        style={styles.inputName}
                        value={this.state.name}
                        onChangeText={(name) => {
                            this.setState({ name: name });
                            StateStore.setName(name);
                        }}
                        placeholder={'지갑 이름'}
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize='none'
                        autoCorrect={false}
                        maxLength={20}
                        multiline={false}
                    />

                    <Text style={styles.explain2}>아래 버튼을 눌러서 지갑 유형을 선택하세요!</Text>
                    <SelectBox
                        list={this.state.TYPE}
                        currentItem={0}
                        onClickBoxFunction={(i) => {
                            this.setType(i)
                        }} />

                    <Text style={styles.explain2}>
                        순수한 지갑 주소만 입력해주세요{'\n'}
                        예)0x6b83f808fce08f51adb2e9e
                    </Text>
                    <TextInput
                        style={styles.inputWalletAddr}
                        value={this.state.addr}
                        onChangeText={(addr) => {
                            this.setState({ addr: addr });
                            StateStore.setAddr(addr);
                        }}
                        placeholder={'지갑 주소'}
                        placeholderTextColor="#FFFFFF"
                        autoCapitalize='none'
                        autoCorrect={false}
                        maxLength={200}
                        multiline={false}
                    />

                    <Text style={styles.explainQRcode}>
                        QR코드 스캐너로 편하게 지갑주소를 입력하세요!
                    </Text>
                    <TouchableOpacity
                        style={styles.scannerBtn}
                        onPress={() => this.qrScanner()}
                    >
                        <Text style={styles.qrBtnText}>
                            QR코드 스캐너
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </ScrollView>
        );
    }
});

const wid = Common.winWidth();
const hei = Common.winHeight();
const styles = StyleSheet.create({
    frame: {
        flex: 1,
    },
    content: {
        alignItems: 'center',
    },
    explain: {
        color: '#FFFFFF',
        opacity: 0.8,
        fontSize: 18,
        margin: 15,
    },
    inputName: {
        width: 0.6 * wid,
        height: 0.065 * hei,
        fontSize: 15,
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: '#000000',
        opacity: 0.3,
        marginBottom: 10,
        paddingLeft: 15,
    },
    explain2: {
        color: '#FFFFFF',
        opacity: 0.8,
        fontSize: 15,
        margin: 15,
    },
    inputWalletAddr: {
        width: 0.6 * wid,
        height: 0.07 * hei,
        fontSize: 13,
        color: '#FFFFFF',
        borderColor: '#FFFFFF',
        borderWidth: 1,
        borderRadius: 15,
        alignSelf: 'center',
        backgroundColor: '#000000',
        opacity: 0.3,
        marginTop: 10,
        marginBottom: 10,
        paddingLeft: 15,
    },
    explainQRcode: {
        textAlign: 'center',
        color: '#FFFFFF',
        opacity: 0.8,
        fontSize: 15,
        margin: 10,
    },
    scannerBtn: {
        width: 0.35 * wid,
        height: 0.06 * hei,
        borderWidth: 1,
        borderRadius: 20,
        borderColor: '#FFFFFF',
        padding: 5,
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.6,
        marginBottom: 10,
    },
    qrBtnText: {
        color: '#FFFFFF',
        fontSize: 16,
    },
});

export default MyWalletAdd
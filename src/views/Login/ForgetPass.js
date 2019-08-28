import React,{Component} from 'react'
import {View} from 'react-native'
import {Form,Item,Label,Input,Button,Text} from 'native-base'

class ForgetPass extends Component {
    render() {
        return (
            <View>
                <Form>
                    <Item inlineLabel>
                        <Label>手机号</Label>
                        <Input placeholder='请输入您的手机号' />
                    </Item>
                    <Item inlineLabel last>
                        <Label>验证码</Label>
                        <Input secureTextEntry placeholder='短信验证码' />
                    </Item>
                </Form>
                <Button block style={{ margin: 15, marginTop: 50 }}>
                    <Text>下一步</Text>
                </Button>
            </View>
        )
    }
}

export default ForgetPass
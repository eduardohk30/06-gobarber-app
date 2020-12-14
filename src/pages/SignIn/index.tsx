import React, { useCallback, useRef } from 'react';
import { 
    Image, 
    KeyboardAvoidingView, 
    Platform, 
    View, 
    ScrollView, 
    TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { 
    Container, 
    Title, 
    ForgotPassword, 
    ForgotPasswordText, 
    CreateAccountButton, 
    CreateAccountButtonText 
} from './styles';

import logoImg from '../../assets/logo.png';


/*
 * A Tag View que está entre a tag Title só está lá porque a tag Text na qual a Title é derivada não 
 * funciona direito com animações de transition, dessa forma colocamos essa tag dentro da view que
 * se encarregará de fazer essa animação para nós
 */
const SingIn: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const passwordInputRef = useRef<TextInput>(null);
    const navigation = useNavigation();

    const handleSignIn = useCallback((data: object) => {
        console.log(data);
    }, []);

    return (
        <>
            <KeyboardAvoidingView 
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >   
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={{flex:1}}
                >
                    <Container>
                        <Image source={logoImg} />
                        <View> 
                            <Title>Faça seu logon</Title>
                        </View>

                        <Form ref={formRef} onSubmit={handleSignIn}>
                            <Input 
                                autoCorrect={false}
                                autoCapitalize="none"
                                keyboardType="email-address"
                                name="email" 
                                icon="mail" 
                                placeholder="E-mail"
                                returnKeyType="next"
                                onSubmitEditing={()=>{
                                    passwordInputRef.current?.focus();
                                }}
                            />

                            <Input 
                                ref={passwordInputRef}
                                name="password" 
                                icon="lock" 
                                placeholder="Senha"
                                secureTextEntry
                                returnKeyType="send"
                                onSubmitEditing={()=>{
                                    formRef.current?.submitForm();
                                }}
                            />

                            <Button 
                            onPress={()=>{
                                formRef.current?.submitForm();
                            }}>
                                Entrar
                            </Button>
                        </Form>

                        <ForgotPassword onPress={() => {}}>
                            <ForgotPasswordText>Esqueci minha senha</ForgotPasswordText>
                        </ForgotPassword>
                    </Container>

                    <CreateAccountButton onPress={() => navigation.navigate('SignUp')}>
                        <Icon name="log-in" size={20} color="#ff9000" />
                        <CreateAccountButtonText>Criar uma conta</CreateAccountButtonText>
                    </CreateAccountButton>
                </ScrollView>
            </KeyboardAvoidingView>

        </>
    );
};

export default SingIn;
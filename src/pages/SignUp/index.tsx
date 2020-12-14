import React, { useRef } from 'react';
import { Image, KeyboardAvoidingView, Platform, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native'
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { 
    Container, 
    Title, 
    BackToSignIn, 
    BackToSignInText 
} from './styles';

import logoImg from '../../assets/logo.png';


/*
 * A Tag View que está entre a tag Title só está lá porque a tag Text na qual a Title é derivada não 
 * funciona direito com animações de transition, dessa forma colocamos essa tag dentro da view que
 * se encarregará de fazer essa animação para nós
 */
const SingUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const navigation = useNavigation();
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
                            <Title>Crie sua conta</Title>
                        </View>

                        <Form ref={formRef} onSubmit={() => {}}>

                            <Input 
                                autoCapitalize="words"
                                name="name" 
                                icon="user" 
                                placeholder="Nome"
                            />

                            <Input 
                                keyboardType="email-address" 
                                autoCorrect={false}
                                autoCapitalize="none"
                                name="email" 
                                icon="mail" 
                                placeholder="E-mail"
                            />

                            <Input 
                                secureTextEntry
                                name="password" 
                                icon="lock" 
                                placeholder="Senha"
                            />

                            <Button 
                                onPress={() => formRef.current?.submitForm()}
                            >
                                Entrar
                            </Button>

                        </Form>

                    </Container>

                    <BackToSignIn onPress={() => navigation.goBack()}>
                        <Icon name="arrow-left" size={20} color="#fff" />
                        <BackToSignInText>Voltar para logon</BackToSignInText>
                    </BackToSignIn>
                </ScrollView>
            </KeyboardAvoidingView>

        </>
    );
};

export default SingUp;
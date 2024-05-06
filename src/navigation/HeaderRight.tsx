import {useAppDispatch, useAppSelector} from '@reduxToolkit/index';
import {setUserLang} from '@reduxToolkit/slice/userData';
import React from 'react';
import {useTranslation} from 'react-i18next';
import styled from 'styled-components/native';
import i18n from '../../i18n';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';

const LangToggleContainer = styled.View`
  background-color: #b9b8b8;
  flex-direction: row;
  border-radius: 40px;
`;

const LangBlock = styled.Pressable<{selected: boolean}>`
  background-color: ${({selected}) => (selected ? '#af09e1' : 'transparent')};
  padding-left: 10px;
  padding-right: 10px;
  border-radius: 40px;
`;

const LangText = styled.Text<{selected: boolean}>`
  color: ${({selected}) => (selected ? '#FFF' : 'black')};
  font-weight: 800;
`;
const LANGUAGES = [
  {label: 'English', value: 'en'},
  {label: 'Arabic', value: 'ar'},
];
const HeaderRight = () => {
  const dispatch = useAppDispatch();
  const {t} = useTranslation();
  const language = useAppSelector(state => state.userData?.language) ?? 'en';
  return (
    <LangToggleContainer>
      {LANGUAGES.map(item => {
        const selected = language === item.value;
        return (
          <LangBlock
            key={item.label}
            onPress={() => {
              dispatch(setUserLang(item.value));
              i18n
                .changeLanguage(item.value)
                .then(() => {
                  I18nManager.forceRTL(i18n.language === 'ar');
                  RNRestart.Restart();
                })
                .catch(() => {
                  console.log('something went wrong while applying RTL');
                });
            }}
            disabled={selected}
            selected={selected}>
            <LangText selected={selected}>{t(item.label)}</LangText>
          </LangBlock>
        );
      })}
    </LangToggleContainer>
  );
};

export default HeaderRight;

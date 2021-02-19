import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import * as settingsEnum from "../enum/settings";
import defaultStyles from "../config/styles";
import { useSettings } from "../context/settings";
import { useDetectTablet } from "../hooks/use-detect-tablet";

import Screen from "../components/screen";
import Comment from "../components/comment";
import Option from "../components/option";
import Text from "../components/text";
import KanaText from "../components/kana-text";
import Action from "../components/action";

export default function ChooseKanaTypeScreen() {
  const isTablet = useDetectTablet();
  const [, dispatch] = useSettings();

  const [selected, setSelected] = useState({
    [settingsEnum.kanaType.HIRAGANA]: true,
    [settingsEnum.kanaType.KATAKANA]: false,
    [settingsEnum.kanaType.WITH_MARKS]: false,
    [settingsEnum.kanaType.COMBINED]: false,
  });

  const handleOptionPress = (value) =>
    selected[value]
      ? setSelected((prevSelected) => ({ ...prevSelected, [value]: false }))
      : setSelected((prevSelected) => ({ ...prevSelected, [value]: true }));

  const renderOption = (text, value, kana) => (
    <Option
      onPress={() => handleOptionPress(value)}
      isSelected={selected[value]}
    >
      <Text style={styles.optionText} text={text} />
      <KanaText text={kana} />
    </Option>
  );

  return (
    <Screen style={styles.screen}>
      <View style={[isTablet ? styles.tablet : styles.normal]}>
        <Comment containerStyle={styles.comment} text="Which kana then..?" />
        <View>
          {renderOption("Hiragana", settingsEnum.kanaType.HIRAGANA, "あ")}
          {renderOption("Katakana", settingsEnum.kanaType.KATAKANA, "ア")}
          {renderOption("With marks", settingsEnum.kanaType.WITH_MARKS, "が")}
          {renderOption("Combined", settingsEnum.kanaType.COMBINED, "きゃ")}
        </View>
        <Action
          style={styles.action}
          onPress={() =>
            dispatch({
              type: settingsEnum.actionTypes.SET_KANA_TYPES,
              payload: selected,
            })
          }
          text="Select"
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: defaultStyles.colors.grayishViolet,
    padding: defaultStyles.spacing.s3,
    justifyContent: "space-around",
  },
  normal: {
    flex: 1,
    justifyContent: "space-around",
  },
  tablet: {
    flex: 1,
    width: "70%",
    marginLeft: "auto",
    marginRight: "auto",
    justifyContent: "space-around",
  },
  comment: {
    marginTop: defaultStyles.spacing.s3,
    marginBottom: defaultStyles.spacing.s0,
  },
  optionText: {
    color: defaultStyles.colors.blue,
    textTransform: "lowercase",
    marginRight: defaultStyles.spacing.s0,
  },
  action: {
    marginBottom: defaultStyles.spacing.s3,
  },
});

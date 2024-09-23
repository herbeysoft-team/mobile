import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import InputTag, { useInputTag } from "react-native-input-tags";
import React, { useState } from "react";
import { FONTS, SIZES, COLORS } from "../../constant";

export default function CustomInputTags({ addTag, removeTag, defaultTags}) {
  const [tags, setTags] = useState(defaultTags || []);
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleAddTag = () => {
    const trimmedTag = text.trim(); 
    if (trimmedTag !== '') {
      setTags([...tags, trimmedTag]);
      setText('');
      addTag(trimmedTag); 
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
    removeTag(index); 
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View
      style={{
        ...FONTS.body3,
        borderWidth: SIZES.thickness / 3,
        borderColor: isFocused ? COLORS.primary : COLORS.gray4,
        color: COLORS.tertiary,
        marginVertical: SIZES.thickness,
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        gap: SIZES.base,
        padding: SIZES.base2,
        borderRadius: SIZES.radius / 2,
      }}
    >
      <View style={{ flexDirection: "row", flexWrap: 'wrap', alignItems: 'center', width: '100%'}}>
        {tags.map((tag, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              marginVertical: SIZES.thickness,
              marginRight: SIZES.thickness,
              borderColor: COLORS.gray4,
              borderWidth: SIZES.thin,
              padding: SIZES.thickness,
              borderRadius: SIZES.base,
              color: COLORS.gray4,
            }}
          >
            <Text
              style={{ ...FONTS.body4, color: COLORS.tertiary }} onPress={() => handleRemoveTag(index)}
            >{`#${tag}`}</Text>
          </View>
        ))}
        <TextInput
          value={text}
          onChangeText={(value) => setText(value)}
          placeholder="Add tag"
          onSubmitEditing={handleAddTag}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
      </View>
    </View>
  );
}

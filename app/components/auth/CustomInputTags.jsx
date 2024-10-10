import React, { useState, useRef } from 'react';
import { View, TextInput, Text, TouchableOpacity, ScrollView } from 'react-native';
import { FONTS, SIZES, COLORS } from "../../constant";

const CustomInputTags = ({ addTag, removeTag, defaultTags = [] }) => {
  const [tags, setTags] = useState(defaultTags);
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleAddTag = () => {
    const trimmedTag = text.trim();
    if (trimmedTag !== '' && !tags.includes(trimmedTag)) {
      const newTags = [...tags, trimmedTag];
      setTags(newTags);
      setText('');
      addTag(trimmedTag);
    }
  };

  const handleRemoveTag = (index) => {
    const newTags = tags.filter((_, i) => i !== index);
    setTags(newTags);
    removeTag(index);
  };

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <View
      style={{
        ...FONTS.body3,
        borderWidth: SIZES.thickness / 3,
        borderColor: isFocused ? COLORS.primary : COLORS.gray4,
        color: COLORS.tertiary,
        marginVertical: SIZES.thickness,
        padding: SIZES.base2,
        borderRadius: SIZES.radius / 2,
      }}
    >
      <ScrollView 
        horizontal={false} 
        contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}
      >
        {tags.map((tag, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleRemoveTag(index)}
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: SIZES.thickness,
              marginRight: SIZES.thickness,
              borderColor: COLORS.gray4,
              borderWidth: SIZES.thin,
              padding: SIZES.thickness,
              borderRadius: SIZES.base,
            }}
          >
            <Text style={{ ...FONTS.body4, color: COLORS.tertiary }}>
              {`#${tag}`}
            </Text>
          </TouchableOpacity>
        ))}
        <TextInput
          ref={inputRef}
          value={text}
          onChangeText={setText}
          placeholder="Add tag"
          onSubmitEditing={handleAddTag}
          onFocus={handleFocus}
          onBlur={handleBlur}
          style={{
            ...FONTS.body3,
            color: COLORS.tertiary,
            padding: SIZES.thickness,
            flex: 1,
            minWidth: 100,
          }}
        />
      </ScrollView>
    </View>
  );
};

export default CustomInputTags;
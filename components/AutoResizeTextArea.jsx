import { Textarea } from "@chakra-ui/react";
import ResizeTextarea from "react-textarea-autosize";
import React from "react";

 const AutoResizeTextarea = React.forwardRef((props, ref) => {
  return (
    <Textarea
      minH="unset"
      overflow="hidden"
      w="100%"
      resize="none"
      ref={ref}
      minRows={2}
      as={ResizeTextarea}
      {...props}
    />
  );
});

AutoResizeTextarea.displayName = 'AutoResizeTextarea'

export {AutoResizeTextarea}
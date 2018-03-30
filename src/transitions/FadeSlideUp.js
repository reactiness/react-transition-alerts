import Transition from "react-transition-group/Transition";
import React from "react";

export function FadeSlideUp({ children, duration, maxHeight, in: inProp }) {
  const defaultStyle = {
    transition: `${duration}ms ease-in`,
    transitionProperty: "opacity, transform, max-height",
    width: "100%"
  };
  const transitionStyles = {
    entering: {
      opacity: 0,
      transform: "translateY(+100%)",
      maxHeight: "0px"
    },
    entered: {
      opacity: 1,
      transform: "translateY(0)",
      maxHeight
    },
    exiting: {
      opacity: 0,
      transform: "translateY(-100%)",
      maxHeight: "0px"
    }
  };

  return (
    <Transition
      in={inProp}
      timeout={{
        enter: 0,
        exit: duration
      }}
    >
      {status => {
        if (status === "exited") {
          return null;
        }
        const currentStyles = transitionStyles[status];
        return React.cloneElement(children, {
          style: Object.assign(
            {},
            children.props.style,
            defaultStyle,
            currentStyles
          )
        });
      }}
    </Transition>
  );
}

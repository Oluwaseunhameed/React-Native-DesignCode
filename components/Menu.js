import React, { useState, useEffect } from "react";
import styled from "styled-components/native";
import {
  Animated,
  TouchableOpacity,
  Dimensions,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import MenuItem from "./MenuItems";
import { connect } from "react-redux";

const screenHeight = Dimensions.get("window").height;

const mapStateToProps = store => ({
  action: store?.action
});
const mapDispatchToProps = dispatch => ({
  updateAll: arg => dispatch({ type: arg })
});
const Menu = ({ action, updateAll }) => {
  const animate = new Animated.Value(screenHeight + 100);
  const [top, settop] = useState(animate);
  useEffect(() => {
    toggle();
  }, [action]);

  const toggle = () => {
    if (action === "openmenu") {
      Animated.spring(top, {
        toValue: 60
      }).start();
    }
    if (action === "closemenu") {
      Animated.spring(top, {
        toValue: screenHeight + 100
      }).start();
    }
  };

  return (
    <Animate style={{ top: top }}>
      <Cover>
        <Image source={require("../assets/background12.jpg")} />
        <Title>Oluwaseun Hameed</Title>
        <Subtitle>hameedoluwaseun@gmail.com</Subtitle>
      </Cover>
      <TouchableOpacity
        onPress={() => updateAll("Close")}
        style={{
          position: "absolute",
          top: 120,
          left: "50%",
          marginLeft: -22,
          zIndex: 1
        }}
      >
        <CloseView>
          <Ionicons name="md-close" size={40} color={"#546bfb"} />
        </CloseView>
      </TouchableOpacity>
      <ScrollView>
        <Content>
          {Menu_item.map((item, ind) => (
            <MenuItem
              key={ind}
              title={item.title}
              icon={item.icon}
              text={item.text}
            />
          ))}
        </Content>
      </ScrollView>
    </Animate>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

const Image = styled.Image`
  position: absolute;
  width: 100%;
`;
const Title = styled.Text`
  font-weight: bold;
  font-size: 25px;
  color: white;
  margin-bottom: 8px;
`;
const Subtitle = styled.Text`
  color: white;
`;

const Content = styled.View`
  width: 100%;
  height: ${screenHeight};
  background: white;
`;

const CloseView = styled.View`
  align-items: center;
  justify-content: center;
  width: 42px;
  background: white;
  height: 42px;
  elevation: 50;
  border-radius: 50px;
`;
const Cover = styled.View`
  width: 100%;
  height: 142px;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const Container = styled.View`
  position: absolute;
  height: ${screenHeight};
  width: 100%;
  top: 0px;
  z-index: 2;
  border-radius: 20px;
  overflow: hidden;
`;
const Animate = Animated.createAnimatedComponent(Container);

const Menu_item = [
  {
    icon: "md-settings",
    title: "Account",
    text: "settings"
  },
  {
    icon: "md-card",
    title: "Billing",
    text: "payments"
  },
  {
    icon: "md-compass",
    title: "Learn React",
    text: "start course"
  },
  {
    icon: "md-exit",
    title: "Log out",
    text: "see you soon"
  }
];

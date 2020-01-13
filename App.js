import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import Svg, { Path } from "react-native-svg";
import { getStatusBarHeight } from "react-native-status-bar-height";

const SettingSvgComponent = (
  <Svg width={28.764} height={28.765} fill="#9182DE">
    <Path d="M28.674 12.786a.936.936 0 0 0-.925-.708 3.176 3.176 0 0 1-2.173-5.528.8.8 0 0 0 .087-1.084 14.232 14.232 0 0 0-2.278-2.3.8.8 0 0 0-1.093.088 3.315 3.315 0 0 1-3.587.806A3.2 3.2 0 0 1 16.762.936.8.8 0 0 0 16.056.1 14.359 14.359 0 0 0 12.82.087a.8.8 0 0 0-.712.823 3.2 3.2 0 0 1-1.969 3.069 3.324 3.324 0 0 1-3.56-.811.8.8 0 0 0-1.082-.091 14.286 14.286 0 0 0-2.327 2.3.8.8 0 0 0 .086 1.093 3.187 3.187 0 0 1 .8 3.589A3.325 3.325 0 0 1 .927 12a.782.782 0 0 0-.831.706A14.408 14.408 0 0 0 .09 15.98a.951.951 0 0 0 .943.707 3.154 3.154 0 0 1 2.964 1.971 3.2 3.2 0 0 1-.8 3.556.8.8 0 0 0-.1 1.086 14.284 14.284 0 0 0 2.275 2.3.8.8 0 0 0 1.095-.087 3.31 3.31 0 0 1 3.585-.807 3.189 3.189 0 0 1 1.945 3.123.8.8 0 0 0 .706.84 14.314 14.314 0 0 0 3.236.009.8.8 0 0 0 .712-.824 3.2 3.2 0 0 1 1.968-3.067 3.319 3.319 0 0 1 3.562.81.8.8 0 0 0 1.085.091 14.319 14.319 0 0 0 2.327-2.3.8.8 0 0 0-.086-1.093 3.187 3.187 0 0 1-.806-3.588 3.22 3.22 0 0 1 2.942-1.95h.178a.8.8 0 0 0 .842-.705 14.4 14.4 0 0 0 .011-3.266zM14.405 19.21a4.8 4.8 0 1 1 4.8-4.8 4.8 4.8 0 0 1-4.8 4.8z" />
  </Svg>
);

const HomeSvgComponent = (
  <Svg width={32.861} height={27.932} fill="#9182DE">
    <Path d="M13.144 27.932v-9.859h6.572v9.858h8.215V14.787h4.929L16.43 0 0 14.787h4.929v13.145z" />
  </Svg>
);

const statusBarHeight = getStatusBarHeight();
export default class App extends Component {
  state = {
    score: 0,
    time: 10,
    count: 1,
    totalPage: 15,
    firstNumber: 8,
    secondNumber: 2,
    answer: [16, 19, 18, 20],
    backgroundColor: ["#FFFDEE", "#FFFDEE", "#FFFDEE", "#FFFDEE"],
    clicked: false,
    page: 1
  };
  componentDidMount() {
    setInterval(() => {
      if (this.state.page < 15) {
        if (this.state.time > 0) {
          this.setState({ time: this.state.time - 1 });
        } else if (this.state.time == 0) {
          // if (this.state.score > 0 && !this.state.clicked) {
          //   this.setState({
          //     score: this.state.score - 10
          //   });
          // }
          this.reset();
        }
      }
    }, 1000);
  }
  onClick = button => {
    let ans = this.state.firstNumber * this.state.secondNumber;
    let backgroundColor = [].concat(this.state.backgroundColor);
    if (this.state.answer[button] == ans) {
      backgroundColor[button] = "#20C063";
      this.setState({
        backgroundColor,
        clicked: true,
        score: this.state.score + 10
      });
    } else {
      backgroundColor[button] = "#FB6F68";
      for (i = 0; i < 4; i++) {
        if (ans == this.state.answer[i]) {
          backgroundColor[i] = "#20C063";
        }
      }
      if (this.state.score > 0) {
        this.setState({
          backgroundColor,
          clicked: true,
          score: this.state.score - 10
        });
      } else {
        this.setState({
          backgroundColor,
          clicked: true
        });
      }
    }
  };
  reset = () => {
    let arr = [].concat(this.state.answer);
    let backgroundColor = [].concat(this.state.backgroundColor);
    let firstNumber = Math.floor(Math.random() * 10);
    let secondNumber = Math.floor(Math.random() * 10);
    let result = firstNumber * secondNumber;
    let fakeResult = result + 1;
    let position = Math.floor(Math.random() * (3 + 1));
    for (i = 0; i < arr.length; i++) {
      backgroundColor[i] = "#FFFDEE";
      if (i == position) {
        arr[i] = result;
        fakeResult += 1;
      } else {
        arr[i] = fakeResult;
        fakeResult += 1;
        //console.log("else" + fakeResult);
      }
    }
    this.setState({
      firstNumber,
      secondNumber,
      answer: arr,
      page: this.state.page + 1,
      time: 10,
      backgroundColor,
      clicked: !this.state.clicked
    });
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="dark-content" />
        <View
          style={{
            height: statusBarHeight,
            width: "100%",
            backgroundColor: "#fff"
          }}
        />
        <View
          style={{ width: "100%", aspectRatio: 5 / 1, flexDirection: "row" }}
        >
          <View
            style={{
              flex: 0.7,
              justifyContent: "center",
              alignItems: "flex-end"
            }}
          >
            {SettingSvgComponent}
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-start",
              paddingLeft: 10
            }}
          >
            <Text style={styles.textInput}>Score </Text>
            <Text style={styles.textInput}>{this.state.score}</Text>
          </View>
          <View
            style={{
              flex: 2,
              flexDirection: "row",
              justifyContent: "flex-end",
              alignItems: "center",
              paddingRight: 10
            }}
          >
            <Text style={styles.textInput}>Time : </Text>
            <Text style={styles.textInput}>{this.state.time}</Text>
          </View>
          <View
            style={{
              flex: 0.7,
              justifyContent: "center",
              alignItems: "flex-start"
            }}
          >
            {HomeSvgComponent}
          </View>
        </View>
        <View
          style={{
            width: "100%",
            aspectRatio: 7 / 1,
            justifyContent: "flex-start",
            alignItems: "flex-end",
            paddingRight: 12
          }}
        >
          <Text style={styles.textInput}>
            {this.state.page}/{this.state.totalPage}
          </Text>
        </View>
        <View
          style={{
            width: "100%",
            aspectRatio: 5 / 4,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <View
            style={{
              backgroundColor: "#FFFDEE",
              height: "60%",
              width: "90%",
              borderBottomColor: "#EC6966",
              borderBottomWidth: 6,
              borderRadius: 10,
              shadowColor: "grey",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.5,
              shadowRadius: 2,
              elevation: 3,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <View
              style={{
                width: "100%",
                aspectRatio: 6 / 1,
                flexDirection: "row"
              }}
            >
              <View
                style={{
                  flex: 3,
                  justifyContent: "center",
                  alignItems: "flex-end"
                }}
              >
                <Text style={styles.textInput2}>{this.state.firstNumber}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={[styles.textInput2, { fontSize: 30 }]}>X</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={styles.textInput2}>{this.state.secondNumber}</Text>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <Text style={styles.textInput2}>=</Text>
              </View>
              <View
                style={{
                  flex: 3,
                  justifyContent: "center",
                  alignItems: "flex-start"
                }}
              >
                <Text style={styles.textInput2}>?</Text>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{ width: "100%", aspectRatio: 5 / 1, flexDirection: "row" }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={[
                styles.btn,
                { backgroundColor: this.state.backgroundColor[0] }
              ]}
              onPress={() => {
                if (!this.state.clicked) {
                  this.onClick("0");
                }
              }}
            >
              <Text
                style={[
                  styles.textInput2,
                  {
                    color:
                      this.state.backgroundColor[0] == "#FFFDEE"
                        ? "#FB6F68"
                        : "white"
                  }
                ]}
              >
                {this.state.answer[0]}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={[
                styles.btn,
                { backgroundColor: this.state.backgroundColor[1] }
              ]}
              onPress={() => {
                if (!this.state.clicked) {
                  this.onClick("1");
                }
              }}
            >
              <Text
                style={[
                  styles.textInput2,
                  {
                    color:
                      this.state.backgroundColor[1] == "#FFFDEE"
                        ? "#FB6F68"
                        : "white"
                  }
                ]}
              >
                {this.state.answer[1]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ width: "100%", aspectRatio: 13 / 1 }} />
        <View
          style={{ width: "100%", aspectRatio: 5 / 1, flexDirection: "row" }}
        >
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={[
                styles.btn,
                { backgroundColor: this.state.backgroundColor[2] }
              ]}
              onPress={() => {
                if (!this.state.clicked) {
                  this.onClick("2");
                }
              }}
            >
              <Text
                style={[
                  styles.textInput2,
                  {
                    color:
                      this.state.backgroundColor[2] == "#FFFDEE"
                        ? "#FB6F68"
                        : "white"
                  }
                ]}
              >
                {this.state.answer[2]}
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flex: 1,
              justifyContent: "center",
              alignItems: "center"
            }}
          >
            <TouchableOpacity
              style={[
                styles.btn,
                { backgroundColor: this.state.backgroundColor[3] }
              ]}
              onPress={() => {
                if (!this.state.clicked) {
                  this.onClick("3");
                }
              }}
            >
              <Text
                style={[
                  styles.textInput2,
                  {
                    color:
                      this.state.backgroundColor[3] == "#FFFDEE"
                        ? "#FB6F68"
                        : "white"
                  }
                ]}
              >
                {this.state.answer[3]}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  textInput: { color: "#9182DE", fontSize: 20 },
  textInput2: { fontSize: 48, color: "#FB6F68", fontWeight: "bold" },
  btn: {
    backgroundColor: "#FFFDEE",
    width: 150,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "grey",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    borderRadius: 10
  }
});

function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}const buttonClick = new Audio("https://cdn.freesound.org/previews/553/553362_11409686-lq.mp3");

const lastSeconds = new Audio("https://cdn.freesound.org/previews/485/485406_6142149-lq.mp3");

const bellSound = new Audio("https://cdn.freesound.org/previews/328/328823_4877562-lq.mp3");

const breakDone = new Audio("https://cdn.freesound.org/previews/242/242501_4414128-lq.mp3");

const sessionDone = new Audio("https://cdn.freesound.org/previews/322/322930_5260872-lq.mp3");

const coolSound = new Audio("https://cdn.freesound.org/previews/619/619834_7614679-lq.mp3");

const coolSound2 = new Audio("https://cdn.freesound.org/previews/619/619837_7614679-lq.mp3");

const popupSound = new Audio("https://cdn.freesound.org/previews/364/364657_6687700-lq.mp3");

const dialogTextList = [
{
  "type": "skip",
  "title": "Skip session?",
  "desc": "You are skipping without completing the session." },

{
  "type": "stop",
  "title": "Are you sure?",
  "desc": "You are in the middle of a focus session, would you like to finish this session?" },
{
  "type": "discard",
  "title": "Discard changes?",
  "desc": "Are you sure you wish to discard the current changes? " }];



class Dialog extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleDialogCallback",


    type => {
      this.props.handleDialogCallback(false);
      this.props.handleDialogReturnResult(type);
    });}

  render() {
    const dialog = dialogTextList.filter(dialog => dialog.type === this.props.dialogType)[0];

    return /*#__PURE__*/(
      React.createElement("dialog", { open: this.props.mode }, /*#__PURE__*/
      React.createElement("div", { className: "content" }, /*#__PURE__*/
      React.createElement("h3", null, dialog && dialog.title), /*#__PURE__*/
      React.createElement("p", null, dialog && dialog.desc), /*#__PURE__*/
      React.createElement("div", { class: "btn-group" }, /*#__PURE__*/
      React.createElement("button", {
        class: "secondary",
        onClick: () => this.handleDialogCallback("back") }, "back"), /*#__PURE__*/


      React.createElement("button", {
        id: dialog && dialog.type === "stop" ? "reset" : null,
        class: "primary",
        onClick: () => this.handleDialogCallback(dialog && dialog.type) },
      dialog && dialog.type)))));





  }}



class SessionContainer extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "bulletItems",


    () => {
      const { sessionFocusCounter, selectedActiveMode } = this.props;
      const arr = [];
      // for (let i = 0; i < sessionFocusCounter % 4; i++) {
      //   arr.push(
      //     <div className={`session s ${selectedActiveMode === "pomodoro" ? "show" : null}`}></div>
      //   );
      // }
      for (let i = 0; i < 4; i++) {
        arr.push( /*#__PURE__*/
        React.createElement("div", { className: "session s show" }));

      }
      return arr;
    });_defineProperty(this, "bItems",


    focusCounter => {
      const { remainingTime, animationDuration, selectedActiveMode, sessionFocusCounter } = this.props;
      const item =
      remainingTime === animationDuration ? "s" :
      remainingTime > animationDuration / 4 * 3 ? "s0" :
      remainingTime > animationDuration / 4 * 2 ? "s1" :
      remainingTime > animationDuration / 4 ? "s2" :
      0 < remainingTime ? "s3" : "s4";
      const arr = [];
      const count = focusCounter % 4;
      const rest = 4 - count - 1;
      // const rest = 4 - count - 1;
      for (let i = 0; i <= count; i++) {
        if (i !== count) {
          arr.push( /*#__PURE__*/React.createElement("div", { className: "session s4 show" }));
        } else {
          if (selectedActiveMode === "pomodoro") {
            arr.push( /*#__PURE__*/React.createElement("div", { className: `session ${item} show` }));
          } else if (selectedActiveMode !== "pomodoro" && focusCounter !== 0 && focusCounter % 4 === 0) {
            arr.push( /*#__PURE__*/React.createElement("div", { className: "session s4 show" }));
          } else
          {
            arr.push( /*#__PURE__*/React.createElement("div", { className: "session s show" }));
          }
        }
      }
      for (let i = 1; i <= rest; i++) {
        if (selectedActiveMode !== "pomodoro" && focusCounter !== 0 && focusCounter % 4 === 0) {
          arr.push( /*#__PURE__*/React.createElement("div", { className: "session s4 show" }));
        } else {
          arr.push( /*#__PURE__*/React.createElement("div", { className: "session s show" }));
        }


      }
      return arr;

    });}

  render() {
    const { sessionFocusCounter } = this.props;

    return /*#__PURE__*/(

      React.createElement("div", { className: "session-container" },
      this.bItems(sessionFocusCounter)));



  }}


class Timer extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "handleKeyPress",































































































    event => {
      if (!this.props.isDialogOpen) {
        if (event.keyCode === 32 && event.type === "keydown") {
          event.preventDefault();
          event.target.blur();
          if (this.state.timerStatusButtonTitle === "PAUSE") {
            this.toggleTimerStart("pause");
          } else if (this.state.timerStatusButtonTitle === "RESUME") {
            this.toggleTimerStart("resume");
          } else if (this.state.timerStatusButtonTitle === "START") {
            this.toggleTimerStart("start");
          }
        } else if (event.keyCode === 39 && event.type === "keydown" && this.state.isTimerOnProgress) {
          event.preventDefault();
          event.target.blur();
          this.progressButtonOnClick("skip");
        } else if (event.keyCode === 39 && event.type === "keydown" && !this.state.isTimerOnProgress) {
          event.preventDefault();
          event.target.blur();
          if (this.props.selectedActiveMode === "pomodoro") {
            this.props.handleSelectedActiveMode("short break");
          } else if (this.props.selectedActiveMode === "short break") {
            this.props.handleSelectedActiveMode("long break");
          }
        } else if (event.keyCode === 37 && event.type === "keydown" && !this.state.isTimerOnProgress) {
          event.preventDefault();
          event.target.blur();
          if (this.props.selectedActiveMode === "long break") {
            this.props.handleSelectedActiveMode("short break");
          } else if (this.props.selectedActiveMode === "short break") {
            this.props.handleSelectedActiveMode("pomodoro");
          }
        } else if (event.keyCode === 27 && event.type === "keydown" && this.state.isTimerOnProgress) {
          event.preventDefault();
          event.target.blur();
          this.progressButtonOnClick("stop");
        }
      } else {
        if (event.keyCode === 13 && event.type === "keydown") {
          event.preventDefault();
          event.target.blur();
          this.props.handleDialogCallback(false);
          this.props.handleDialogReturnResult(this.props.dialogType);
        } else
        if (event.keyCode === 27 && event.type === "keydown") {
          event.preventDefault();
          event.target.blur();
          this.props.handleDialogCallback(false);
          this.props.handleDialogReturnResult("back");
        }
      }

    });_defineProperty(this, "animationCircleComplete",

    () => {
      let circleAnim = document.getElementsByClassName("colored")[0];
      circleAnim.style.transitionDuration = ".5s";
      // circleAnim.style.animationName = "timerComplete";
      // circleAnim.style.animationPlayState = "running";
      // circleAnim.style.animationDuration =  ".5s";
      circleAnim.style.strokeDashoffset = 95.625 / (this.state.remainingTime + this.state.spendingTimeCount) * this.state.spendingTimeCount + "em";

    });_defineProperty(this, "setTimer",

    () => {
      const { permanentValue } = this.state;
      const { timePomodoro, timeShort, timeLong, selectedActiveMode } = this.props;
      const remainingTime = (selectedActiveMode === "pomodoro" ? timePomodoro : selectedActiveMode === "short break" ? timeShort : timeLong) * this.state.permanentValue;
      this.animationCircleComplete();
      this.clear();

      this.setState({
        remainingTime: remainingTime,
        animationDuration: remainingTime,
        minute: Math.floor(remainingTime / permanentValue),
        second: remainingTime % permanentValue,
        timerStatusButtonTitle: "START",
        isTimerOnProgress: false,
        spendingTimeCount: 0 });

    });_defineProperty(this, "killTimerProgress",

    () => {
      this.toggleTimerStart("stop");
      // this.animationCircleComplete();
      this.clear();
      this.setTimer();
      this.props.handleDialogReturnResult(null);
      if (this.props.dialogReturn !== "stop") {
        if (this.state.sessionFocusCounter !== 0 || this.state.sessionShortBreakCounter !== 0 || this.state.sessionLongBreakCounter !== 0) {
          this.nextStepTimeout =
          setTimeout(() => {
            this.props.handleSelectedActiveMode("skip");
            this.toggleTimerStart("start");
          }, 500);
          this.props.selectedActiveMode === "short break" ?
          this.lastSecondsSoundInterval = setTimeout(() => {
            breakDone.currentTime = 0;
            breakDone.play();
          }, 1000) : this.props.selectedActiveMode === "pomodoro" ?
          this.lastSecondsSoundInterval = setTimeout(() => {
            sessionDone.currentTime = 0;
            sessionDone.play();
          }, 1000) : this.lastSecondsSoundInterval = setTimeout(() => {
            bellSound.currentTime = 0;
            bellSound.play();
          }, 1000);
        }
      }
    });_defineProperty(this, "clear",


    () => {
      clearInterval(this.intervalTimer);
    });_defineProperty(this, "toggleTimerStart",

    type => {
      if (type && type === "stop") {
        if (this.props.dialogReturn === "stop") {
          this.setState({
            sessionShortBreakCounter: 0,
            sessionLongBreakCounter: 0,
            sessionFocusCounter: 0 },
          () => {
            this.props.handleFocusSessionCounter(this.state.sessionFocusCounter);
            this.animationCircleComplete();
          });
        }
        this.setState({
          isTimerRunning: false,
          isTimerOnProgress: false,
          timerStatusButtonTitle: "START" },
        () => {
          this.clear();
          this.props.handleIsTimerRunning(false);
          this.props.handleIsTimerOnProgress(false);
        });
      } else
      if (type && type === "pause") {
        this.setState({
          isTimerRunning: false,
          isTimerOnProgress: true,

          timerStatusButtonTitle: "RESUME" },
        () => {
          this.clear();
          this.props.handleIsTimerRunning(false);
          this.props.handleIsTimerOnProgress(true);
        });
      } else
      if (type && type === "resume") {
        this.setState({
          isTimerRunning: true,
          isTimerOnProgress: true,

          timerStatusButtonTitle: "PAUSE" },
        () => {
          this.timer();
          this.props.handleIsTimerRunning(true);
          this.props.handleIsTimerOnProgress(true);
        });
      } else
      if (type && type === "start") {

        this.setState({
          isTimerRunning: true,
          isTimerOnProgress: true,

          timerStatusButtonTitle: "PAUSE" },
        () => {
          this.timer();
          this.props.handleIsTimerRunning(true);
          this.props.handleIsTimerOnProgress(true);
        });
      }

    });_defineProperty(this, "sessionCounter",

    type => {
      if (type === "short break") {
        this.setState({
          sessionShortBreakCounter: this.state.sessionShortBreakCounter + 1 });

      } else if (type === "long break") {
        this.setState({
          sessionLongBreakCounter: this.state.sessionLongBreakCounter + 1 });

      } else if (type === "pomodoro") {
        this.setState({
          sessionFocusCounter: this.state.sessionFocusCounter + 1 },
        () => {
          this.props.handleFocusSessionCounter(this.state.sessionFocusCounter);
        });
      }
    });_defineProperty(this, "timer",

    () => {

      let circleAnim = document.getElementsByClassName("colored")[0];
      circleAnim.style.transitionDuration = "1s";
      this.setState({
        timerStatusButtonTitle: "PAUSE" });

      clearTimeout(this.nextStepTimeout);
      this.nextStepTimeout = null;

      this.intervalTimer = setInterval(() => {
        if (this.state.remainingTime === 10) {
          lastSeconds.currentTime = 0;
          lastSeconds.play();
        }



        if (this.state.remainingTime === 0) {
          this.sessionCounter(this.props.selectedActiveMode);
          this.killTimerProgress();
        } else {
          this.setState(prevState => ({
            remainingTime: prevState.remainingTime - 1,
            spendingTimeCount: prevState.spendingTimeCount + 1 }),
          () => {
            this.setState(({ remainingTime, permanentValue }) => ({
              minute: Math.floor(remainingTime / permanentValue),
              second: remainingTime % permanentValue }));

            circleAnim.style.strokeDashoffset = 95.625 / this.state.animationDuration * (this.state.animationDuration - this.state.remainingTime) + "em";
          });
        }
      }, 1000);
    });_defineProperty(this, "progressButtonOnClick",


    type => {
      if (this.state.timerStatusButtonTitle === "PAUSE") {
        this.setState({ didIPausedTimer: false });
        this.toggleTimerStart("pause");
      } else if (this.state.timerStatusButtonTitle === "RESUME") {
        this.setState({ didIPausedTimer: true });
      }
      this.props.handleDialogCallback(true, type);
    });this.state = { minute: null, second: null, remainingTime: null, spendingTimeCount: 0, permanentValue: 60, //second
      animationDuration: null, isTimerRunning: false, isTimerOnProgress: false, sessionFocusCounter: 0, sessionShortBreakCounter: 0, sessionLongBreakCounter: 0, timerStatusButtonTitle: "START", didIPausedTimer: false };this.intervalTimer = null;this.nextStepTimeout = null;this.lastSecondsSoundInterval = null;this.handleKeyPress = this.handleKeyPress.bind(this);}componentDidMount() {this.setTimer();document.addEventListener("keydown", this.handleKeyPress);}componentWillMount() {document.removeEventListener("keydown", this.handleKeyPress);}componentDidUpdate(prevProps, prevState) {//////////////
    const { sessionFocusCounter } = this.state;if (this.props.timePomodoro !== prevProps.timePomodoro && this.props.selectedActiveMode === "pomodoro") {this.setState({ minute: this.props.timePomodoro });} else if (this.props.timeShort !== prevProps.timeShort && this.props.selectedActiveMode === "short break") {this.setState({ minute: this.props.timeShort });} else if (this.props.timeLong !== prevProps.timeLong && this.props.selectedActiveMode === "long break") {this.setState({ minute: this.props.timeLong });}if (this.props.dialogReturn === "stop" && this.props.dialogReturn !== prevProps.dialogReturn) {this.killTimerProgress();if (this.props.selectedActiveMode !== "pomodoro") {this.nextStepTimeout = setTimeout(() => {this.props.handleSelectedActiveMode("pomodoro"); //////////////
        }, 500);}} else if (this.props.dialogReturn === "skip" && this.props.dialogReturn !== prevProps.dialogReturn) {this.killTimerProgress();this.nextStepTimeout = setTimeout(() => {this.props.handleSelectedActiveMode("skip");this.toggleTimerStart("start");}, 500);} else if (this.props.dialogReturn === "back" && this.props.dialogReturn !== prevProps.dialogReturn) {!this.state.didIPausedTimer && this.toggleTimerStart("resume");this.props.handleDialogReturnResult(null);}if (prevProps.selectedActiveMode !== this.props.selectedActiveMode) {this.setTimer();}if (prevState.isTimerRunning !== this.state.isTimerRunning) {// let circleAnim = document.getElementsByClassName("colored")[0];
      // circleAnim.classList.remove("start"); 
      if (this.state.isTimerRunning) {// circleAnim.style.animationName = "timerStart"
        // circleAnim.style.animationDuration = this.state.animationDuration + "s";
        // circleAnim.style.animationPlayState = "running";
        // circleAnim.style.animationDirection = "";
        // circleAnim.classList.add("start"); 
        this.setState({ isTimerOnProgress: true, spendingTimeCount: 0 });} else {// circleAnim.style.animationPlayState = "paused";
      }}}render() {const { timePomodoro, timeShort, timeLong, selectedActiveMode } = this.props;const { isTimerRunning, minute, second, remainingTime, isTimerOnProgress, timerStatusButtonTitle } = this.state;const time = selectedActiveMode === "pomodoro" ? timePomodoro : selectedActiveMode === "short break" ? timeShort : timeLong;const mn = minute <= 9 ? "0" + minute : minute;const sc = second <= 9 ? "0" + second : second; // const ttt = new Date(mn * 60000).toISOString().substr(14, 5);


    return /*#__PURE__*/(
      React.createElement("section", { align: "center" }, /*#__PURE__*/

      React.createElement("div", { className: `timer ${isTimerRunning ? "start" : "pause"}` }, /*#__PURE__*/
      React.createElement("svg", { xmIns: "http: //www.w.org/2000/svg", version: "1.1" }, /*#__PURE__*/
      React.createElement("defs", null, /*#__PURE__*/
      React.createElement("linearGradient", { id: "GradientColor" }, /*#__PURE__*/
      React.createElement("stop", { offset: "0%" }), /*#__PURE__*/
      React.createElement("stop", { offset: "100%" }))), /*#__PURE__*/


      React.createElement("circle", { className: "bg", "stroke-linecap": "round" }), /*#__PURE__*/
      React.createElement("circle", {
        ref: circle => this.circleElement = circle,
        className: "colored", "stroke-linecap": "round" })), /*#__PURE__*/

      React.createElement("div", { className: "inner-circle" }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/

      React.createElement(SessionContainer, {
        sessionFocusCounter: this.state.sessionFocusCounter,
        animationDuration: this.state.animationDuration,
        remainingTime: this.state.remainingTime,
        selectedActiveMode: selectedActiveMode }), /*#__PURE__*/

      React.createElement("p", { className: "clock", id: "time-left", style: { "--color": "red" } }, /*#__PURE__*/
      React.createElement("span", null, mn), /*#__PURE__*/
      React.createElement("span", null, ":"), /*#__PURE__*/
      React.createElement("span", null, sc)), /*#__PURE__*/

      React.createElement("a", {
        id: "start_stop",
        href: "javascript:void(0)",
        onClick: () => {
          !isTimerOnProgress ? (
          this.toggleTimerStart("start"),
          buttonClick.currentTime = 0,
          buttonClick.play()) :
          isTimerRunning ? (
          this.toggleTimerStart("pause"),
          buttonClick.currentTime = 0,
          buttonClick.play()) :
          isTimerOnProgress && !isTimerRunning ? (
          this.toggleTimerStart("resume"),
          buttonClick.currentTime = 0,
          buttonClick.play()) :
          null;} },
      timerStatusButtonTitle),

      isTimerRunning || isTimerOnProgress ? /*#__PURE__*/
      React.createElement("div", { className: "awe-container" }, /*#__PURE__*/
      React.createElement("a", {
        id: "reset",
        href: "javascript:void(0)",
        onClick: () => {this.progressButtonOnClick("stop");} }, /*#__PURE__*/React.createElement("i", { class: "fa-solid fa-stop" })), /*#__PURE__*/
      React.createElement("a", { href: "javascript:void(0)", onClick: () => {this.progressButtonOnClick("skip");} }, /*#__PURE__*/React.createElement("i", { class: "fa-solid fa-angles-right" }))) :

      null)))));






  }}


class SlideButtonItem extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "switchMode",
























































    (mode, i, type) => {
      const top = this.slideRef[i].current.offsetTop;
      const width = this.slideRef[i].current.offsetWidth;
      const translateX = i === 0 ? "translateX(calc(-100% - 0.5rem)" : i === 2 ? "translateX(calc(100% + 0.5rem))" : "translateX(0)";
      if (type === "dialogReturnBack") {

        this.setState({
          top: top,
          width: width,
          slideItemSelection: mode },
        () => {
          this.props.handleSelectedButtonTopVal(top);
          this.props.handleSelectedButtonWidthVal(width);
          this.props.handleSelectedButtonTranslateX(translateX);
          this.props.handleChildSlideItemSelection(this.state.slideItemSelection);
          this.props.handleDialogReturnResult(null);
        });
      } else
      if (type === "switchMode") {

        this.setState({
          top: top,
          width: width,
          slideItemSelection: mode },
        () => {
          this.props.handleSelectedButtonTopVal(top);
          this.props.handleSelectedButtonWidthVal(width);
          this.props.handleSelectedButtonTranslateX(translateX);
          this.props.handleChildSlideItemSelection(this.state.slideItemSelection);
          this.props.handleSelectedMode(mode);
        });
      } else if (type === "resize") {
        this.setState({
          top: top,
          width: width,
          slideItemSelection: mode },
        () => {
          this.props.handleSelectedButtonTopVal(top);
          this.props.handleSelectedButtonWidthVal(width);
          this.props.handleSelectedButtonTranslateX(translateX);
          this.props.handleChildSlideItemSelection(this.state.slideItemSelection);
        });
      }
    });this.state = { translateX: null, top: null, width: null, slideItemSelection: "pomodoro", isResizeActive: false };this.slideRef = this.props.item.map(() => React.createRef()); // this.resizeTimeout = undefined;
    // this.resizeListener = this.resizeListener.bind(this);
  }componentDidMount(props) {this.switchMode(this.props.activeMode, 0, "switchMode"); // window.addEventListener('resize', this.resizeListener);
  } //   componentWillUnmount() {
  //     window.removeEventListener('resize', this.resizeListener);
  //   }
  //   resizeListener = () => {
  //     const {item, activeMode, isResizeActive} = this.props;
  //     this.switchMode(activeMode, item.indexOf(activeMode), "resize");
  //     this.setState({ isResizeActive: true }, () => {
  //       this.switchMode(activeMode, item.indexOf(activeMode), "resize");
  //     });
  //     clearTimeout(this.resizeTimeout);
  //     this.resizeTimeout = setTimeout(() => {
  //       this.setState({ isResizeActive: false }, () => {
  //         this.switchMode(activeMode, item.indexOf(activeMode), "resize");
  //       });
  //     }, 250);
  //   }
  componentDidUpdate(prevProps, prevState) {const { item, activeMode, isResizeActive } = this.props;if (activeMode !== prevProps.activeMode) {this.switchMode(activeMode, item.indexOf(activeMode), "switchMode");}if (isResizeActive !== prevProps.isResizeActive) {this.switchMode(activeMode, item.indexOf(activeMode), "resize");}if (this.props.dialogReturn === "back" && this.props.dialogReturn !== prevProps.dialogReturn) {this.switchMode(prevProps.activeMode, item.indexOf(prevProps.activeMode), "dialogReturnBack");}}render() {const { activeMode, item, slideRef } = this.props;return /*#__PURE__*/React.createElement(React.Fragment, null, item.map((obj, i) => /*#__PURE__*/React.createElement("a", { onClick: () => this.switchMode(obj, i, "switchMode"), className: this.state.slideItemSelection === obj ? "bt-active" : null, ref: this.slideRef[i], "data-content": obj })));}}class SlideButtonContainer extends React.Component {constructor(props) {super(props);_defineProperty(this, "handleSelectedMode",



















    childData => {
      if (this.props.isTimerOnProgress) {
        this.props.handleDialogCallback(true, "skip");
      } else


      {
        this.setState({
          activeMode: childData },
        () => {
          this.props.handleSelectedActiveMode(this.state.activeMode);
        });
      }
    });_defineProperty(this, "handleSelectedButtonTopVal",

    childData => {
      this.setState({
        top: childData + "px" });

    });_defineProperty(this, "handleSelectedButtonWidthVal",

    childData => {
      this.setState({
        width: childData + "px" });

    });_defineProperty(this, "handleChildSlideItemSelection",

    childData => {
      this.setState({
        slideItemSelection: childData });

    });_defineProperty(this, "handleSelectedButtonTranslateX",

    childData => {
      this.setState({
        translateX: childData });

    });_defineProperty(this, "toggleSettingsScreen",

    () => {
      this.setState({
        isSettingsOpen: !this.props.isSettingsOpen },
      () => {this.props.handleToggleSettingsScreen(this.state.isSettingsOpen);
      });
    });this.state = { isSettingsOpen: false, activeMode: this.props.activeMode, top: 0, width: 0, buttonList: ["pomodoro", "short break", "long break"], slideItemSelection: "pomodoro", translateX: 0 };}componentDidUpdate(prevProps, prevState) {if (this.state.slideItemSelection !== prevState.slideItemSelection) {this.props.handleParentSlideItemSelection(this.state.slideItemSelection);}}

  render() {
    const { left, top, width, activeMode, buttonList, translateX } = this.state;
    return /*#__PURE__*/(
      React.createElement("div", { className: this.props.isTimerRunning && "disabled" }, /*#__PURE__*/
      React.createElement("div", { className: "button-container" }, /*#__PURE__*/
      React.createElement(SlideButtonItem, {
        item: buttonList
        // activeMode={activeMode}
        , activeMode: this.props.activeMode,
        isTimerOnProgress: this.props.isTimerOnProgress,
        isDialogOpen: this.props.isDialogOpen,
        dialogReturn: this.props.dialogReturn,
        handleDialogCallback: this.props.handleDialogCallback,
        handleDialogReturnResult: this.props.handleDialogReturnResult,
        handleSelectedMode: this.handleSelectedMode,
        handleSelectedButtonTopVal: this.handleSelectedButtonTopVal,
        handleSelectedButtonWidthVal: this.handleSelectedButtonWidthVal,
        handleChildSlideItemSelection: this.handleChildSlideItemSelection,
        handleSelectedButtonTranslateX: this.handleSelectedButtonTranslateX,
        isResizeActive: this.props.isResizeActive }), /*#__PURE__*/


      React.createElement("div", { className: "highlight", style: { "top": top, "width": width, "transform": translateX } })), /*#__PURE__*/

      React.createElement("a", {
        href: "javascript:void(0)",
        onClick: this.toggleSettingsScreen }, /*#__PURE__*/
      React.createElement("i", { class: "fa-solid fa-gear" }))));



  }}

class NumericInput extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "decrease",








    name => {
      let { value, increment, minLimit, maxLimit } = this.state;

      this.setState({
        value: value < increment * 2 ? minLimit : value === maxLimit && increment !== 1 ? value + (increment - value % increment) - increment : value - increment },

      () => {
        this.props.handleTime(name, this.state.value);
      });

    });_defineProperty(this, "increase",

    name => {
      let { value, increment, minLimit, maxLimit } = this.state;

      this.setState({
        value: maxLimit - increment < value ? maxLimit : value === minLimit && increment !== 1 ? increment : value + increment },

      () => {
        this.props.handleTime(name, this.state.value);
      });

    });this.state = { value: Number(this.props.value), increment: Number(this.props.increment), minLimit: Number(this.props.minLimit), maxLimit: Number(this.props.maxLimit) };}

  render() {
    const isItBreakContent = this.props.name.indexOf('break') > -1;
    return /*#__PURE__*/(

      React.createElement("div", { className: `item ${this.props.disabled && "disabled"}` }, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("a", {
        href: "javascript:void(0)",
        onClick: () => this.decrease(this.props.name),
        id: isItBreakContent ? "break-decrement" : "session-decrement" }), /*#__PURE__*/

      React.createElement("span", {
        id: isItBreakContent ? "break-length" : "session-length" },
      this.state.value), /*#__PURE__*/
      React.createElement("a", {
        href: "javascript:void(0)",
        onClick: () => this.increase(this.props.name),
        id: isItBreakContent ? "break-increment" : "session-increment" })), /*#__PURE__*/


      React.createElement("p", { id: isItBreakContent ? "break-label" : "session-label" }, this.props.name), /*#__PURE__*/
      React.createElement("span", null, "-- on progress --")));



  }}


class RadioContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { theme } = this.props;
    return /*#__PURE__*/(
      React.createElement("div", { className: "theme-container" }, /*#__PURE__*/
      React.createElement(RadioButton, {
        name: "blue",
        isChecked: theme === "blue" ? true : false,
        handleSelectedTheme: this.props.handleSelectedTheme,
        autoModeTheme: this.props.autoModeTheme }), /*#__PURE__*/

      React.createElement(RadioButton, {
        name: "green",
        isChecked: theme === "green" ? true : false,
        handleSelectedTheme: this.props.handleSelectedTheme,
        autoModeTheme: this.props.autoModeTheme }), /*#__PURE__*/

      React.createElement(RadioButton, {
        name: "red",
        isChecked: theme === "red" ? true : false,
        handleSelectedTheme: this.props.handleSelectedTheme,
        autoModeTheme: this.props.autoModeTheme }), /*#__PURE__*/

      React.createElement(RadioButton, {
        name: "auto",
        isChecked: theme === "auto" ? true : false,
        handleSelectedTheme: this.props.handleSelectedTheme,
        autoModeTheme: this.props.autoModeTheme })));



  }}

class RadioButton extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "onValueChange",






    event => {
      const { name, autoModeTheme } = this.props;

      // const selectedTheme = name === "auto" ? autoModeTheme : this.state.selectedTheme;
      const selectedTheme = event.target.value;
      // const selectedTheme = event.target.value === "auto" ? autoModeTheme : event.target.value;
      this.setState({
        selectedTheme: selectedTheme },
      () => {
        this.props.handleSelectedTheme(this.state.selectedTheme);
      });
    });this.state = { selectedTheme: "auto" //green
    };}
  render() {
    const { name, isChecked } = this.props;

    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("label", { className: `theme-${name}` }, /*#__PURE__*/
      React.createElement("input", {
        type: "radio",
        name: "theme",
        value: name,
        checked: isChecked,
        onChange: this.onValueChange,
        id: "theme-" + name }), /*#__PURE__*/
      React.createElement("span", null))));




  }}

class SettingsScreen extends React.Component {

  constructor(props) {
    super(props);_defineProperty(this, "handleSelectedTheme",











    childData => {
      this.setState({ selectedTheme: childData }, () => {
        this.props.handleSelectedTheme(childData);
      });
    });_defineProperty(this, "toggleSettingsScreen",

    () => {

      this.setState({
        isSettingsOpen: !this.props.isSettingsOpen },
      () => {
        this.props.handleToggleSettingsScreen(this.state.isSettingsOpen);
      });

    });_defineProperty(this, "handleTime",


    (childName, childValue) => {
      const { timePomodoro, timeShort, timeLong } = this.state;
      this.setState({
        timePomodoro: childName === "pomodoro" ? childValue : timePomodoro,
        timeShort: childName === "short break" ? childValue : timeShort,
        timeLong: childName === "long break" ? childValue : timeLong },
      () => {
        this.props.handleTimerData(this.state.timePomodoro, this.state.timeShort, this.state.timeLong);
      });
    });this.state = { selectedTheme: "auto", //green
      isSettingsOpen: false, timePomodoro: "1", //25
      timeShort: "1", //5
      timeLong: "1" //25
    };this.handleSelectedTheme = this.handleSelectedTheme.bind(this);this.handleTime = this.handleTime.bind(this);}render() {const { timePomodoro, timeShort, timeLong, selectedActiveMode, isTimerOnProgress } = this.props;
    return /*#__PURE__*/(
      React.createElement("div", { class: "settings" }, /*#__PURE__*/
      React.createElement("section", { align: "left" }, /*#__PURE__*/
      React.createElement("h1", null, "what is pomodoro?"), /*#__PURE__*/
      React.createElement("p", null, /*#__PURE__*/React.createElement("b", null, "Pomodoro"), " is a time management technique that helps people improve productivity and focus. It involves breaking down work into ", /*#__PURE__*/React.createElement("b", null, "25-minute intervals"), ", followed by ", /*#__PURE__*/React.createElement("b", null, "a short 5-minute break"), ", and then taking ", /*#__PURE__*/React.createElement("b", null, "a longer 15-30 minute break"), " after every four work sessions. Developed by Francesco Cirillo in the late 1980s, the Pomodoro technique is widely used among students, professionals, and creators as a way to increase productivity, manage time more effectively, and reduce the likelihood of burnout or mental fatigue.")), /*#__PURE__*/

      React.createElement("section", null, /*#__PURE__*/
      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h4", null, "TIME"), /*#__PURE__*/
      React.createElement("div", { className: "num-container" }, /*#__PURE__*/
      React.createElement(NumericInput, {
        value: timePomodoro,
        handleTime: this.handleTime,
        minLimit: "1",
        maxLimit: "59",
        increment: "1" // set it to 1 or 5
        , name: "pomodoro",
        disabled: selectedActiveMode === "pomodoro" && isTimerOnProgress ? true : false
        // themeDefault="blue"
      }), /*#__PURE__*/

      React.createElement(NumericInput, {
        selectedActiveMode: selectedActiveMode,
        value: timeShort,
        handleTime: this.handleTime,
        minLimit: "1",
        maxLimit: "59",
        increment: "1",
        name: "short break",
        disabled: selectedActiveMode === "short break" && isTimerOnProgress ? true : false
        // themeDefault="red"
      }), /*#__PURE__*/

      React.createElement(NumericInput, {
        selectedActiveMode: selectedActiveMode,
        value: timeLong,
        handleTime: this.handleTime,
        minLimit: "1",
        maxLimit: "59" // set it to 1 or 5
        , increment: "1",
        name: "long break",
        disabled: selectedActiveMode === "long break" && isTimerOnProgress ? true : false
        // themeDefault="green"
      }))), /*#__PURE__*/



      React.createElement("div", null, /*#__PURE__*/
      React.createElement("h4", null, "COLOR"), /*#__PURE__*/
      React.createElement(RadioContainer, { autoModeTheme: this.props.autoModeTheme, theme: this.state.selectedTheme, handleSelectedTheme: this.handleSelectedTheme }))), /*#__PURE__*/


      React.createElement("section", null, /*#__PURE__*/
      React.createElement("div", { className: "btn-group" }, /*#__PURE__*/
      React.createElement("button", { className: "secondary", onClick: this.toggleSettingsScreen }, /*#__PURE__*/React.createElement("i", { class: "fa-solid fa-chevron-left" }), "\xA0\xA0back"), /*#__PURE__*/
      React.createElement("button", { className: "primary", id: "codepen", type: "button", onClick: () => {window.open('https://codepen.io/badeozgule', '_blank');} }, /*#__PURE__*/React.createElement("i", { class: "fab fa-codepen" }), " codepen")))));




  }}



class App extends React.Component {
  constructor(props) {
    super(props);_defineProperty(this, "resizeListener",
































    () => {
      this.setState({ isResizeActive: true });
      clearTimeout(this.resizeTimeout);
      this.resizeTimeout = setTimeout(() => {
        this.setState({ isResizeActive: false });
      }, 250);
    });_defineProperty(this, "toggleSettingsScreen",

    childData => {
      this.setState({
        isSettingsOpen: !!childData ? childData : !this.state.isSettingsOpen });

    });_defineProperty(this, "handleSelectedTheme",

    childData => {

      this.setState({
        isAutoModeThemeActive: childData === "auto" ? true : false },
      () => {
        this.setState({
          selectedTheme: childData === "auto" ? this.state.autoModeTheme : childData });

      });
    });_defineProperty(this, "handleSelectedActiveMode",

    childData => {
      const { selectedActiveMode, isAutoModeThemeActive, isTimerRunning, sessionFocusCounter, slideItemSelection } = this.state;

      if (childData === "skip") {
        if (selectedActiveMode !== slideItemSelection) {

          if (selectedActiveMode === "pomodoro") {

            if (slideItemSelection === "short break") {
              this.setState({
                selectedActiveMode: "short break",
                autoModeTheme: "red" },
              () => {
                if (isAutoModeThemeActive) {
                  this.handleSelectedTheme("auto");
                }
              });
            } else if (slideItemSelection === "long break") {
              this.setState({
                selectedActiveMode: "long break",
                autoModeTheme: "blue" },
              () => {
                if (isAutoModeThemeActive) {
                  this.handleSelectedTheme("auto");
                }
              });
            }

          } else if (selectedActiveMode === "short break") {

            if (slideItemSelection === "pomodoro") {
              this.setState({
                selectedActiveMode: "pomodoro",
                autoModeTheme: "green" },
              () => {
                if (isAutoModeThemeActive) {
                  this.handleSelectedTheme("auto");
                }
              });
            } else if (slideItemSelection === "long break") {
              this.setState({
                selectedActiveMode: "long break",
                autoModeTheme: "blue" },
              () => {
                if (isAutoModeThemeActive) {
                  this.handleSelectedTheme("auto");
                }
              });
            }

          } else if (selectedActiveMode === "long break") {
            if (slideItemSelection === "pomodoro") {
              this.setState({
                selectedActiveMode: "pomodoro",
                autoModeTheme: "green" },
              () => {
                if (isAutoModeThemeActive) {
                  this.handleSelectedTheme("auto");
                }
              });
            } else if (slideItemSelection === "short break") {
              this.setState({
                selectedActiveMode: "short break",
                autoModeTheme: "red" },
              () => {
                if (isAutoModeThemeActive) {
                  this.handleSelectedTheme("auto");
                }
              });
            }
          }
        } else
        {
          if (selectedActiveMode === "pomodoro") {
            if (sessionFocusCounter % 4 === 0 && sessionFocusCounter !== 0) {
              this.setState({
                selectedActiveMode: "long break",
                autoModeTheme: "blue" },
              () => {
                if (isAutoModeThemeActive) {
                  this.handleSelectedTheme("auto");
                }
              });
            } else {
              this.setState({
                selectedActiveMode: "short break",
                autoModeTheme: "red" },
              () => {
                if (isAutoModeThemeActive) {
                  this.handleSelectedTheme("auto");
                }
              });
            }
          } else if (selectedActiveMode === "short break" || selectedActiveMode === "long break") {
            this.setState({
              selectedActiveMode: "pomodoro",
              autoModeTheme: "green" },
            () => {
              if (isAutoModeThemeActive) {
                this.handleSelectedTheme("auto");
              }
            });
          }

        }
      } else

      if (childData !== "skip") {
        this.setState({
          selectedActiveMode: childData,
          autoModeTheme: childData === "pomodoro" ? "green" : childData === "short break" ? "red" : "blue" },
        () => {
          if (isAutoModeThemeActive) {
            this.handleSelectedTheme("auto");
          }
        });
      }
    });_defineProperty(this, "handleTimerData",

    (childPomodoroData, childShortData, childLongData) => {
      this.setState({
        timePomodoro: childPomodoroData,
        timeShort: childShortData,
        timeLong: childLongData });

    });_defineProperty(this, "handleDialogCallback",


    (childData, childType) => {
      if (childData) {
        clearTimeout(this.animationTimeout);
        this.setState({
          dialogType: childType,
          isDialogOpen: childData });

      } else {
        this.setState({
          isDialogOpen: childData },
        () => {
          this.animationTimeout =
          setTimeout(() => this.setState({
            dialogType: childType }),
          300);});
      }


    });_defineProperty(this, "handleDialogReturnResult",

    childData => {
      this.setState({
        dialogReturn: childData });



    });_defineProperty(this, "handleIsTimerRunning",

    childData => {
      this.setState({
        isTimerRunning: childData });

    });_defineProperty(this, "handleIsTimerOnProgress",

    childData => {
      this.setState({
        isTimerOnProgress: childData });

    });_defineProperty(this, "handleFocusSessionCounter",

    childData => {
      this.setState({
        sessionFocusCounter: childData });

    });_defineProperty(this, "handleParentSlideItemSelection",

    childData => {
      this.setState({
        slideItemSelection: childData });

    });this.state = { isSettingsOpen: false, selectedTheme: "green", autoModeTheme: "green", selectedActiveMode: "pomodoro", timePomodoro: "1", //25
      timeShort: "1", //5
      timeLong: "1", //25
      isResizeActive: false, isDialogOpen: false, dialogType: null, dialogReturn: null, isTimerRunning: false, isTimerOnProgress: false, isAutoModeThemeActive: true, //false
      sessionFocusCounter: 0, slideItemSelection: "pomodoro" };this.animationTimeout = undefined;this.resizeTimeout = undefined;this.resizeListener = this.resizeListener.bind(this);}componentDidMount() {window.addEventListener('resize', this.resizeListener);}componentWillUnmount() {window.removeEventListener('resize', this.resizeListener);}render() {const { isResizeActive, isAutoModeThemeActive, selectedTheme } = this.state;
    return /*#__PURE__*/(
      React.createElement(React.Fragment, null, /*#__PURE__*/
      React.createElement("main", { className: `${isAutoModeThemeActive ? "theme-auto theme-" + selectedTheme : "theme-" + selectedTheme} ${isResizeActive ? "resize-animation-stopper" : ""}` }, /*#__PURE__*/
      React.createElement("div", { className: this.state.isSettingsOpen ? "hidden" : null }, /*#__PURE__*/
      React.createElement("section", { align: "left" }, /*#__PURE__*/
      React.createElement("h1", { id: "timer-label" }, "pomodoro App"), /*#__PURE__*/
      React.createElement("p", null, "Plan your work and stay productive")), /*#__PURE__*/

      React.createElement(Timer, {
        timePomodoro: this.state.timePomodoro,
        timeShort: this.state.timeShort,
        timeLong: this.state.timeLong,
        dialogType: this.state.dialogType,
        dialogReturn: this.state.dialogReturn,
        isDialogOpen: this.state.isDialogOpen,
        selectedActiveMode: this.state.selectedActiveMode,
        handleSelectedActiveMode: this.handleSelectedActiveMode,
        handleDialogCallback: this.handleDialogCallback,
        handleDialogReturnResult: this.handleDialogReturnResult,
        handleIsTimerRunning: this.handleIsTimerRunning,
        handleIsTimerOnProgress: this.handleIsTimerOnProgress,
        handleFocusSessionCounter: this.handleFocusSessionCounter }), /*#__PURE__*/

      React.createElement("section", { class: "controller" }, /*#__PURE__*/
      React.createElement(SlideButtonContainer, {
        isTimerRunning: this.state.isTimerRunning,
        isTimerOnProgress: this.state.isTimerOnProgress,
        activeMode: this.state.selectedActiveMode,
        isDialogOpen: this.state.isDialogOpen,
        dialogReturn: this.state.dialogReturn,
        sessionFocusCounter: this.state.sessionFocusCounter,
        handleDialogCallback: this.handleDialogCallback,
        handleDialogReturnResult: this.handleDialogReturnResult,
        handleSelectedActiveMode: this.handleSelectedActiveMode,
        handleParentSlideItemSelection: this.handleParentSlideItemSelection,
        handleToggleSettingsScreen: this.toggleSettingsScreen,
        isResizeActive: this.state.isResizeActive }), /*#__PURE__*/

      React.createElement('h1', null, 'Welcome to My React App'),

    React.createElement('section', null,
      React.createElement('h2', null, 'Features:'),
      React.createElement('ul', null,
        React.createElement('li', null, 'Feature 1: Lorem ipsum dolor sit amet.'),
        React.createElement('li', null, 'Feature 2: Consectetur adipiscing elit.'),
        React.createElement('li', null, 'Feature 3: Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')
      )
    ),

    React.createElement('section', null,
      React.createElement('h2', null, 'Add Some Feature:'),
      React.createElement('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam.')
    ),

    React.createElement('section', null,
      React.createElement('h2', null, 'FAQ:'),
      React.createElement('dl', null,
        React.createElement('dt', null, 'Q: How do I get started?'),
        React.createElement('dd', null, 'A: Simply follow the instructions in the documentation.'),

        React.createElement('dt', null, 'Q: Can I customize the appearance?'),
        React.createElement('dd', null, 'A: Yes, you can customize the app\'s appearance in the settings.'),

        React.createElement('dt', null, 'Q: Is support available?'),
        React.createElement('dd', null, 'A: Yes, our support team is available 24/7 to assist you.')
      )
    )
	
	
	  
	  )), /*#__PURE__*/




      React.createElement(SettingsScreen, {
        isSettingsOpen: this.state.isSettingsOpen,
        timePomodoro: this.state.timePomodoro,
        timeShort: this.state.timeShort,
        timeLong: this.state.timeLong,
        selectedActiveMode: this.state.selectedActiveMode,
        isTimerOnProgress: this.state.isTimerOnProgress,
        autoModeTheme: this.state.autoModeTheme,
        handleToggleSettingsScreen: this.toggleSettingsScreen,
        handleSelectedTheme: this.handleSelectedTheme,
        handleTimerData: this.handleTimerData }), /*#__PURE__*/

      React.createElement(Dialog, {
        mode: this.state.isDialogOpen,
        isDialogOpen: this.state.isDialogOpen,
        dialogType: this.state.dialogType,
        handleDialogCallback: this.handleDialogCallback,
        handleDialogReturnResult: this.handleDialogReturnResult }))));




  }}


ReactDOM.render( /*#__PURE__*/React.createElement(App, null), document.getElementById("root"));

import {
  VirtualizedList,
  View,
  TouchableOpacity,
  Image,
  Text
} from "react-native";
import _ from "lodash";
import moment from "moment";
import React from "react";

import styleConstructor from "./style";

import DayView from "./DayView";

export default class EventCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.styles = styleConstructor(props.styles);
    this.state = {
      date: moment(this.props.initDate),
      index: 0
    };
  }

  static defaultProps = {
    size: 30,
    initDate: new Date(),
    formatHeader: "DD MMMM YYYY"
  };

  _getItemLayout(data, index) {
    const { width } = this.props;
    return { length: width, offset: width * index, index };
  }

  _getItem(events, index) {
    const date = moment(this.props.initDate).add(
      index - this.props.size,
      "days"
    );
    return _.filter(events, event => {
      const eventStartTime = moment(event.event_start_time);
      return (
        eventStartTime >= date.clone().startOf("day") &&
        eventStartTime <= date.clone().endOf("day")
      );
    });
  }

  _renderItem({ index, item }) {
    const { width, format24h, initDate, scrollToFirst } = this.props;
    const date = moment(initDate).add(index - this.props.size, "days");
    return (
      <DayView
        date={date}
        index={index}
        key={item.id}
        format24h={format24h}
        formatHeader={this.props.formatHeader}
        headerStyle={this.props.headerStyle}
        renderEvent={this.props.renderEvent}
        eventTapped={this.props.eventTapped}
        events={item}
        width={width}
        styles={this.styles}
        scrollToFirst={scrollToFirst}
      />
    );
  }

  _goToPage(index) {
    if (index < 0 || index >= this.props.size * 2) {
      return;
    }
    const date = moment(this.props.initDate).add(
      index - this.props.size,
      "days"
    );
    this.refs.calendar.scrollToIndex({ index, animated: false });
    this.setState({ index, date });
  }

  render() {
    const {
      width,
      virtualizedListProps,
      events,
      initDate,
      formatHeader
    } = this.props;
    return (
      <View style={[this.styles.container, { width }]}>
        <View style={this.styles.header}>
          <TouchableOpacity
            style={{ padding: 30 }}
            onPress={() => this._goToPage(this.state.index - 1)}
          >
            <Image source={require("./back.png")} style={this.styles.arrow} />
          </TouchableOpacity>
          <Text style={this.styles.headerText}>
            Pagina {this.state.index + 1} / {this.props.size * 2}
          </Text>
          <TouchableOpacity
            style={{ padding: 30 }}
            onPress={() => this._goToPage(this.state.index + 1)}
          >
            <Image
              source={require("./forward.png")}
              style={this.styles.arrow}
            />
          </TouchableOpacity>
        </View>
        <VirtualizedList
          ref="calendar"
          windowSize={2}
          initialNumToRender={2}
          initialScrollIndex={this.state.index}
          data={events}
          getItemCount={() => this.props.size * 2}
          getItem={this._getItem.bind(this)}
          keyExtractor={(item, index) => index}
          getItemLayout={this._getItemLayout.bind(this)}
          horizontal
          pagingEnabled
          renderItem={this._renderItem.bind(this)}
          style={{ width: width }}
          stickySectionHeadersEnabled={true}
          onMomentumScrollEnd={event => {
            const index = parseInt(event.nativeEvent.contentOffset.x / width);
            const date = moment(this.props.initDate).add(
              index - this.props.size,
              "days"
            );
            this.setState({ index, date });
          }}
          {...virtualizedListProps}
        />
        <View
          style={{
            backgroundColor: "#FAFAFA",
            paddingTop: 8,
            paddingLeft: 16,
            paddingBottom: 8,
            paddingRight: 16,
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            shadowColor: "#000",
            shadowOpacity: 0.1,
            shadowOffset: { width: 0, height: -4 },
            shadowRadius: 4,
            elevation: 8,
          }}
        >
          <Text style={{ color: "black", fontSize: 14 }}>
          Navigeer tussen de verschillende pagina’s met de pijltjes of door te swipen. Druk op een activiteit voor meer informatie.          </Text>
        </View>
      </View>
    );
  }
}

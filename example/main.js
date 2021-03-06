import React from 'react'
import { Dimensions, View } from 'react-native'

import EventCalendar from './src/EventCalendar'

let { width } = Dimensions.get('window')

export default class App extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      events: [
        { start: '2017-09-07 00:30:00', end: '2017-09-07 01:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-07 01:30:00', end: '2017-09-07 02:20:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-07 04:10:00', end: '2017-09-07 04:40:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-07 01:05:00', end: '2017-09-07 01:45:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
        { start: '2017-09-07 14:30:00', end: '2017-09-07 16:30:00', title: 'Dr. Mariana Joseph', summary: '3412 Piedmont Rd NE, GA 3032' },
      ]
    }
  }

  _eventTapped (event) {
    alert(JSON.stringify(event))
  }

  render () {
    return (
      <View style={{flex: 1, marginTop: 20}}>
        <EventCalendar
          eventTapped={this._eventTapped.bind(this)}
          events={this.state.events}
          width={width}
          format24h={24}
          size={1}
          initDate={'2017-09-07'}
          scrollToFirst
        />
      </View>
    )
  }
}

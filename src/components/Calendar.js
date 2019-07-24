import {Agenda } from 'react-native-calendars';
import React,{Component} from 'react'
import {View} from 'react-native'
class Calendar extends Component {
    render() {
        return(
            <View style={{height:'100%'}}>
                <Agenda
                    // the list of items that have to be displayed in agenda. If you want to render item as empty date
                    // the value of date key kas to be an empty array []. If there exists no value for date key it is
                    // considered that the date in question is not yet loaded
                    // items={{
                    //     '2017-07-24': [{text: 'item 1 - any js object'}],
                    //     '2017-07-23': [{text: 'item 2 - any js object'}],
                    //     '2017-07-22': [],
                    //     '2017-07-21': [{text: 'item 3 - any js object'},{text: 'any js object'}]
                    // }}
                    horizontal={true}
                    // callback that gets called when items for a certain month should be loaded (month became visible)
                    // loadItemsForMonth={(month) => {console.log('trigger items loading')}}
                    // callback that fires when the calendar is opened or closed
                    onCalendarToggled={(calendarOpened) => {console.log(calendarOpened)}}
                    // callback that gets called on day press
                    onDayPress={(day)=>{this.props.setMarkedDates(day)}}
                    // callback that gets called when day changes while scrolling agenda list
                    onDayChange={(day)=>{console.log('day changed')}}
                    // initially selected day
                    selected={this.props.day}
                    // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
                    // minDate={'2012-05-10'}
                    // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
                    // maxDate={'2012-05-30'}
                    // Max amount of months allowed to scroll to the past. Default = 50
                    pastScrollRange={12}
                    // Max amount of months allowed to scroll to the future. Default = 50
                    futureScrollRange={12}
                    // specify how each item should be rendered in agenda
                    renderItem={(item, firstItemInDay) => {console.log(item, firstItemInDay)}}
                    // specify how each date should be rendered. day can be undefined if the item is not first in that day.
                    renderDay={(day, item) => {console.log(day, item)}}
                    // specify how empty date content with no items should be rendered
                    renderEmptyDate={() => {return (<View />);}}
                    // specify how agenda knob should look like
                    renderKnob={() => {return (<View style={{backgroundColor:'#409eff'}} />)}}
                    // specify what should be rendered instead of ActivityIndicator
                    renderEmptyData = {() => {return (<View />);}}
                    // specify your item comparison function for increased performance
                    rowHasChanged={(r1, r2) => {return r1.text !== r2.text}}
                    // Hide knob button. Default = false
                    // hideKnob={false}
                    // By default, agenda dates are marked if they have at least one item, but you can override this if needed
                    markedDates={this.props.markedDay}
                    // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly.
                    // onRefresh={() => console.log('refreshing...')}
                    // Set this true while waiting for new data from a refresh
                    refreshing={false}
                    // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView.
                    // refreshControl={null}
                    // agenda theme
                    theme={{
                        agendaDayTextColor: 'yellow',
                        agendaDayNumColor: 'green',
                        agendaTodayColor: 'red',
                        agendaKnobColor: '#eee',
                        backgroundColor: '#ffffff',
                        calendarBackground: '#ffffff',
                        'stylesheet.calendar.header': {
                            dayHeader:{
                                color: '#ddd'
                            }
                        }
                    }}
                    // agenda container style
                    style={{height:300}}
                    />
            </View>
        )
    }
}


export default Calendar
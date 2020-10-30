import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import { getOtherUser } from '../Actions/Posts'

class User extends Component {

    componentDidMount(){
        this.props.getOtherUser(this.props.match.params.user)
    }

    render() {
        const { loadingPost } = this.props
        console.log(this.props)

        let display 
        if( loadingPost === undefined || loadingPost == true) {
            console.log('first round')
            display = <div>...loading</div>
        } else {
            display = <div>Welcome</div>
        }
        return(
            <React.Fragment>{display}</React.Fragment>
        )
    }
}


const mapStateToProps = state => {
    return {
      OtherUser: state.Data.otherUser,
      loadingPost: state.Data.loadingPost
    }
}


const mapDispatchToProps = dispatch => {

    return {
        getOtherUser: (user) => dispatch(getOtherUser(user))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(User);
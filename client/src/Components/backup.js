class Dashboard extends Component {
    constructor(props) {
        super(props) 
        this.state = {
            currentUser: '',
            posts: [],
            post: '',
            comment: '',
            show: false
        }
    }

    handleShow = ()=> {
        this.setState({show: true});
    }

    handleClose = () => {
        this.setState({show: false});
    }

    onSubmit = (e) => {
        //this.setState({show: false});
        //e.preventDefault()
        //let show = JSON.parse(this.props.isAuthenticated.config.data)

        
        let newpost = {
            post: this.state.post,
            user: this.state.currentUser.email,
        }
        axios.post('/social/posts', newpost)
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }


 

    componentDidMount() {
        

        axios.get('/social/posts')
        .then(res => {
            console.log(res.data)
            
            let displayPosts = res.data.map(post => {
                return post
            })
            this.setState({posts: [...displayPosts], 
                currentUser: JSON.parse(this.props.isAuthenticated.config.data)
            })
        })
        .catch(err => console.log(err))
    }

    render () {

    

        let display;

        let displayposts  = this.state.posts.map((post, index) => (
        
            <React.Fragment>
                <div key={index} className='post'>
                    <p>{post.user}</p>
                    <p>{post.post}</p>
                </div>
                <Link to={`Post/${post._id}`} >
                    <button>
                        OPEN
                    </button>
                </Link>
            </React.Fragment>
            
        ))

        /*Because isAthenticated.date doesn't exist when isAuthenticated
        is null, we will have an error*/
        if(this.props.isAuthenticated.data != null) {

            display = <div>hey there</div>
            /*if(this.props.isAuthenticated.data == true) {
                const currentUser = JSON.parse(this.props.isAuthenticated.config.data)
                console.log(currentUser.email)
            }*/

            if(this.props.isAuthenticated.data == true) {
                
                display = 
                <React.Fragment>
                    <ul>
                        <li className="company"><a>NewsQuest</a></li>
                        <li><button onClick={this.onClick}>Log Out</button></li>
                        <Button variant="primary" onClick={this.handleShow}> Launch demo modal</Button>              
                    </ul>

                    <Modal show={this.state.show} onHide={this.handleClose}>
                        <form onSubmit={this.onSubmit}> 
                            <Modal.Header closeButton>
                                <Modal.Title>Modal heading</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <input type='text'
                                name="post"
                                value={this.state.post}
                                onChange={this.onChange} />
                            </Modal.Body>
                            <Modal.Footer>
                                <Button variant="secondary" onClick={this.handleClose}>
                                    Close
                                </Button>
                                <input type="submit" value="post"/>
                            </Modal.Footer>
                        </form>
                    </Modal>

                    <div className='display-flex'>
                        <div className='post-container'>
                            {displayposts}
                        </div>        
                        <div className="profile">
                            <p>picture: </p>
                            <p>name: </p>
                            <p>bio: </p>
                            <p>website: </p>
                        </div>
                    </div>
            
                </ React.Fragment>
            }
    
            if(this.props.isAuthenticated.data == false) {
                
                this.props.history.push('/LogIn')
            }
        }


        return (
            <React.Fragment>
                {display}
            </ React.Fragment>
        ); 
    } 
}


const mapStateToProps = state => {
    return {
      isAuthenticated: state.Authenticate.isAuthenticated
    }
}

export default connect(Dashboard); 
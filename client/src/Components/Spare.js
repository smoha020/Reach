{(this.props.access == false)? (
    <React.Fragment>
        <ul>
            <li className="company"><a>NewsQuest</a></li>
            <li><a href="/">Home</a></li>
            <li><a href="/users/logout">Log Out</a></li>
        </ul>
        <div className="container">
            {/*<%- include ('partials/messages') %>*/}
            <br></br>
            <form action="/news" method="POST">
                <input type="text" name="search" placeholder="Search"></input>
                <input type="submit" className="searchbutton"></input>
            </form>
            <div className="Newsposts">
                {/*<% articles.forEach(function(article){ %>*/}
                    <div className="post"> 
                        <img className="pic" src="<%= article.urlToImage %>" alt=""></img>
                        <h2 className="mar">{/*<%= article.title %>*/}</h2>
                        <p className="mar">{/*<%= article.author %>*/}</p>
                        <a className="mar read" href="<%= article.url %>" target="_blank">Read More</a> 
                    </div>
                {/*<% }) %>*/}
            </div>
        </div>
    </ React.Fragment>

):(<div>HI</div>)}



//---------------------


 /*WHEN YOU COME TO THIS PAGE VIA URL OR WHEN YOU REFRESH, 
        THE INITIAL RENDERING TAKES PLACE AND isAuthenticated is '', 
        AFTER THIS IT RE-RENDERS AND isAuthenticated GETS THE data PROPERTY*/
            
            if(currentUser && currentUser.data != '') {
        
                console.log('we r logged in')
                if(posts != []) {
                    displayposts  = posts.map((post, index) => {
                    
                        if(post.user == currentUser.data.email) {
                            deletedisplay = <button onClick={this.deletePost.bind(this, post)} style={{color: 'white'}, {background: 'red'}}>
                                        X {currentUser.data.email} , {post.user}
                                    </button>
                        } else deletedisplay = '' 
                        /*WITHTOUT THIS, deletedisplay WILL CONTINUE TO HAVE THE 
                        VALUE ABOVE FOR EVERY ITERATION AFTER THE FIRST TRUE IF STATEMENT.*/
        
                        return (
                            <React.Fragment>
                                <div key={index} className='post'>
                                    {deletedisplay}
                                    <p>{post.user}</p>
                                    <p>{post.body}</p>
                                    <button>Thumbs up count</button>
                                    <p>{post.likeCount} likes</p>
                                    <p>Comment count</p>
                                    <p>{post.commentCount} comments</p>
                                </div>
                               {/*<Link to={`Post/${post._id}`} >
                                    <button>
                                        OPEN
                                    </button>
                                </Link> */}
                                <Button variant="primary" onClick={this.handleShow2.bind(this, post)}>
                                    click me
                                </Button>
            
                            </React.Fragment>
                        )   
                    })
                }

                display = 
                <React.Fragment>
                    <ul>
                        <li className="company"><a>NewsQuest</a></li>
                        <li><button onClick={this.logOut}>Log Out</button></li>
                        <Button variant="primary" onClick={this.handleShow}> Add Post </Button>              
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

                    <Modal show={this.state.show2} onHide={this.handleClose2}>
                        <Modal.Header closeButton>
                            <Modal.Title>Post</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Post post={this.state.postClicked}/>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.handleClose2}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                    <div className='display-flex'>
                        <div className='post-container'>
                            {displayposts}
                        </div>        
                        <div className="profile">
                            <p>Picture: {currentUser.data.credentials.pic}</p>
                            <p>Name: {currentUser.data.credentials.username}</p>
                            <p>Location: {currentUser.data.credentials.location}</p>
                            <p>Bio: {currentUser.data.credentials.bio}</p>
                            <p>Website: {currentUser.data.credentials.website}</p>
                            <p>Joined: {currentUser.data.credentials.joinDate}</p>
                        </div>
                    </div>
            
                </ React.Fragment>
                
        
            } else {
                console.log('we are loading')
                this.props.history.push('/LogIn')
            }
        
        /*Because isAthenticated.data doesn't exist when isAuthenticated
        is null, we will have an error*/
        
        return (
            <div>{display}</div>
        )
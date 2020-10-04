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
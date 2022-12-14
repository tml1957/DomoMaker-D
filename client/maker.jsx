const helper = require('./helper.js');

const handleDomo = (e) => {
    e.preventDefault();
    helper.hideError();

    const name = e.target.querySelector('#domoName').value;
    const age = e.target.querySelector('#domoAge').value;
    const _csrf = e.target.querySelector('#_csrf').value;
    const color = e.target.querySelector('#domoColor').value;

    if (!name || !age) {
        helper.handleError('All fields are required!');
        return false;
    }

    helper.sendPost(e.target.action, {name, age, _csrf, color}, loadDomosFromServer);

    return false;
};

const DomoForm = (props) => {
    return ( 
        <form id="domoForm"
            onSubmit={handleDomo}
            name="domoForm"
            action="/maker"
            method="POST"
            className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input type="text" id="domoName" name="name" placeholder="Domo Name" />
            <label htmlFor="age">Age: </label>
            <input type="number" id="domoAge" name="age" min="0" />
            <label htmlFor="color">Color:</label>
            <select id="domoColor" name="color">
                <option value="brown">Brown</option>
                <option value="green">Green</option>
                <option value="pink">Pink</option>
            </select>
            <input type="hidden" id="_csrf" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Make Domo" />
        </form>
    );
};

const DomoList = (props) => {
    if (props.domos.length === 0) {
        return (
            <div className="domoList">
                <h3 className='emptyDomo'>No Domos Yet!</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(domo => {
        let srcString;

        console.log(domo);

        if (domo.color === "green") {
            srcString = "/assets/img/greendomoface.jpg"
        } else if (domo.color === "pink") {
            srcString = "/assets/img/pinkdomoface.jpg"
        } else {
            srcString = "/assets/img/domoface.jpeg"
        }

        return (
            <div key={domo._id} className="domo">
                <img src={srcString} alt="domo face" className='domoFace' />
                <h3 className='domoName'>Name: {domo.name} </h3>
                <h3 className='domoAge'>Age: {domo.age} </h3>
            </div>
        );
    });

    return (
        <div className='domoList'>
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = async () => {
    const response = await fetch('/getDomos');
    const data = await response.json();

    console.log(data);

    ReactDOM.render(
        <DomoList domos={data.domos} />,
        document.getElementById('domos')
    );
};

const init = async () => {
    const response = await fetch('/getToken');
    const data = await response.json();

    ReactDOM.render(
        <DomoForm csrf={data.csrfToken} />,
        document.getElementById('makeDomo')
    );

    ReactDOM.render(
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );

    loadDomosFromServer();
};

window.onload = init;

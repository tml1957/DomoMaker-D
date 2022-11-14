const helper = require('./helper.js');

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
    const response = await fetch('/getAll');
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
        <DomoList domos={[]} />,
        document.getElementById('domos')
    );

    loadDomosFromServer();
};

window.onload = init;

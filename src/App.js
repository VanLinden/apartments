import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import './App.css';
function App() {
    const [data, setData] = useState([]);
    const [oldData, setOldData] = useState([]);
    useEffect(() => {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', 'https://603e38c548171b0017b2ecf7.mockapi.io/homes', true);
        xhr.send();

        xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
                return false
            }

            if (xhr.status !== 200) {
                console.log(xhr.status + ': ' + xhr.statusText)
            } else {
                setData(JSON.parse(xhr.responseText));
                setOldData(JSON.parse(xhr.responseText));
            }
        }
    }, []);

    const titleSearch = e => {
        let newData = [];
        if ($('#lookingFor').val().length > 3) {
            data.forEach(function (item, index) {
                if (item.title.startsWith($('#lookingFor').val())) {
                    newData.push(item)
                }
            })
            setData(newData);
        } else {
            setData(oldData);
        }
    }
    const getBackgrond = (type) => {
        console.log(type)
        if (type === 'SupportAvailable') {
        return 'rgb(216, 111, 25)';
        }
        if (type === 'IndependentLiving') {
            return 'green';
            }
        }
    data.forEach(element => { element.id = element.id.length < 3 ? '/images/' + element.id + '.png' : element.id })
    
    return (
        <div className="platform">
            <header className="header">
                <div className="title">Our Latest Developments</div>
            </header>
            <div>
                <div style={{ marginLeft: "50px", display: "inline" }}>Filter</div>
                <input type="text" id='lookingFor' className="filterInput" onChange={titleSearch}></input>
            </div>
            {
                data.map((room, i) =>
                    <div key={i} className="mat-card">
                        <div className="mat-card-content">
                            <img className="roomImage" src={room.id} alt='' />
                            <div style={{ backgroundColor: getBackgrond(room.type)}} className="mat-card-type">{room.type}</div>
                        </div>
                        <div className="mat-card-title">{room.title}</div>
                        <div className="mat-card-address">{room.address}</div>
                        <div>
                            <span> New Properties for Sale from </span>
                            <span className="mat-card-price">£{room.price}</span>
                        </div>
                        <div>
                            Shared ownership Available
                        </div>
                    </div>
                )
            }
        </div>
    );
}

export default App;

import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Handlebars from "handlebars";
import { jsPDF } from "jspdf";
import { renderToString } from "react-dom/server";

const print = (data2) => {
  const string = renderToString(<Task/>);
  const pdf = new jsPDF("p", "mm", "a1");
  pdf.html(string, {
    callback: function (string) {
      pdf.save("pdf");
    }
  });
};

const hbr = `
<table style="width:100%;border: 1px solid black;>
<tr style="width:100%;border: 1px solid black;">
<th>First name</th>
<th>Last name</th>
<th>Email</th>
<th>Mobile</th>
</tr>
<tr style="width:100%;border: 1px solid black;">
<td>{{Firstname}}</td>
<td>{{Lastname}}</td>
<td>{{email}}</td>
<td>{{mobile}}</td>
</tr>
</table>
`;
const template = Handlebars.compile(hbr);



const Task = () => {
  const [data, setData] = useState({
    Firstname: "Bharani",
    Lastname: "A",
    gender: "male",
    email: "bharani2dharan@gmail.com",
    mobile: 9751707231,
  });

  const [error, setError] = useState({
    emailError: " ",
    numberError: " ",
    fnameError: " ",
    lnameError: " "
  });

  const [data2, setData2] = useState({
    Firstname: '',
    Lastname: '',
    gender: '',
    email: '',
    mobile: ''
  });


  useEffect(() => {
    setData2({
      Firstname: '',
      Lastname: '',
      gender: '',
      email: '',
      mobile: ''
    })
  }, []);

  const submitHandler = (e) => {
    localStorage.setItem('data2', JSON.stringify(data2));
    e.preventDefault();
    alert('Your Form Submitted Succesfully');
    return (
      setData(data2),
      setData2({
        Firstname: '',
        Lastname: '',
        gender: '',
        email: '',
        mobile: '',

      })
    );
  };

  const getOk = () => {
    setData2(data);
  };



  const changeHandle = (e) => {
    let fn = e.target.name;
    let va = e.target.value;
    let errm = '';
    let errn = '';
    let errf = '';
    let errl = '';
    if (fn === "Firstname") {
      if (va.match(/^[a-zA-Z]+$/)) {
        setData2({ ...data2, [fn]: va })
      } else {
        errf = <strong style={{ color: "red" }}>Invalid Name</strong>
        setError({ fnameError: errf })
      }
    }
    if (fn === "Firstname") {
      if (va.match(/^[a-zA-Z]+$/)) {
        setError({ fnameError: " " })
      }
    }
    if (fn === "Lastname") {
      if (va.match(/^[a-zA-Z]+$/)) {
        setData2({ ...data2, [fn]: va })
      } else {
        errl = <strong style={{ color: "red" }}>Invalid Name</strong>
        setError({ lnameError: errl })
      }
    }
    if (fn === "Lastname") {
      if (va.match(/^[a-zA-Z]+$/)) {
        setError({ lnameError: " " })
      }
    }
    if (fn === "email") {
      if (va.includes('@' && '.')) {
        setData2({ ...data2, [fn]: va })
      } else {
        errm = <strong style={{ color: "red" }}>Invalid Email</strong>
        setError({ emailError: errm })
      }
    }
    if (fn === "email") {
      if (va.includes('@' && '.')) {
        setError({ emailError: " " })
      }
    }
    if (fn === "mobile") {
      if (va.length === 10) {
        setData2({ ...data2, [fn]: va })
      } else {
        errn = <strong style={{ color: "red" }}>Invalid Number</strong>
        setError({ numberError: errn })
      }
    }
    if (fn === "mobile") {
      if (va.length === 10) {
        setError({ numberError: " " })
      }
    }
    setData2({ ...data2, [fn]: va })
  }

  return (
    <div class="container">
      <br />
      <div class="row">
        <div class="col-sm-6">
          <form onSubmit={submitHandler} class="formStyle">
            <b>Firstname</b>
            <div>
              <span><input type="text" name="Firstname" id="firstname" value={data2.Firstname} onChange={changeHandle} placeholder="First name" required />{error.fnameError} </span>
            </div>
            <br />
            <b>Lastname</b>
            <div>
              <span><input type="text" name="Lastname" id="lastname" value={data2.Lastname} onChange={changeHandle} placeholder="Last name" required />{error.lnameError} </span>
            </div>
            <br />
            <b>Email</b>
            <div>
              <span><input type="email" name="email" id="email" value={data2.email} onChange={changeHandle} placeholder="Email" required />{error.emailError} </span>
            </div> <br />
            <b>Mobile</b>
            <div>
              <span><input type="text" name="mobile" id="mobile" value={data2.mobile} onChange={changeHandle} placeholder="Mobile Number" required />{error.numberError}</span>
            </div> <br />
            <div>
              <button type="submit" class="btn btn-success">submit</button>
            </div>
          </form><br /><br />
          <button onClick={getOk} class="btn btn-primary">Get</button>
          <button onClick={print}>print</button>
        </div>
        <div class="col-sm-6" id="abc">
          <div dangerouslySetInnerHTML={{ __html: template(data2) }} />
        </div>
      </div><br />
      <div><p>its working</p>
      </div>

    </div>
  )
}


ReactDOM.render(<Task />, document.getElementById('root'));


 // <b>Gender</b>
 //           <div>
  //          <select onChange={changeHandle} required>
 //             <option selected type="radio" name="male" value={data2.gender}>male</option>
 //             <option value={data2.gender}>Female</option>
  //              <option value={data2.gender}>other</option>
  //          </select>
  //          </div> <br/>






















import { useEffect, useState } from "react";
function Form() {
  const [user, setUser] = useState({});
  const [hobby, setHobby] = useState([]);
  const [error, setError] = useState({});
  const [list, setList] = useState([]);
  const [updateId, setUpdateId] = useState(null);

  useEffect(() => {
    let list = JSON.parse(localStorage.getItem("list")) || [];
    setList(list)
  },[])
  const submit = (e) => {
    e.preventDefault();
    if (!valid()) return;

    let newList = [];
    if (updateId == null) {
      newList = [...list, { ...user, hobby, id: Date.now() }];
    } else {
      newList = list.map((item) =>
        item.id === updateId ? { ...user, hobby, id: updateId } : item
      );
      setUpdateId(null);
    }
    localStorage.setItem("list", JSON.stringify(newList))
    setList(newList);
    setUser({});
    setHobby([]);
    
    
  };

  const change = (e) => {
    let { name, value, checked} = e.target;

    if (name == "hobby"){
      let newHobby =[...hobby];
      if(checked){
        newHobby.push(value)
      }else{
        newHobby = newHobby.filter((value) => value != value)
      }
      console.log(newHobby);
      setHobby(newHobby)
      value = newHobby;
    }
    setUser({...user,[name]: value});
  };

  const valid = () => {
    let tempError = {};
    const pat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!user.username) tempError.username = "Enter a valid username";
    if (!user.email) tempError.email = "Enter a valid email";
    if (!user.password) {
      tempError.password = "Enter a valid password";
    } else if (!pat.test(user.password)) {
      tempError.password =
        "Password must be at least 8 characters, include one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    if (!user.phone) tempError.phone = "Enter a phone number";
    if (hobby.length === 0) tempError.hobby = "Select at least one hobby";
    if (!user.gender) tempError.gender = "Select a gender";
    if (!user.address) tempError.address = "Enter an address";
    if (!user.city) tempError.city = "Select a city";

    setError(tempError);
    return Object.keys(tempError).length === 0;
  };

  const update = (id) => {
    const userToUpdate = list.find((item) => item.id === id); 
    if (userToUpdate) {
      setUser(userToUpdate); 
      setHobby(userToUpdate.hobby); 
      setUpdateId(userToUpdate.id);
    }
  };
  

  const del = (id) => {
    let newlist = [...list]
    newlist = newlist.filter((item) => item.id !== id)
    alert("deleted")
    setList(newlist)
  };

  return (
    <>
      <form action="post" className="w-50 mx-auto d-flex flex-column justify-content-center " onSubmit={submit}>
        <h1>FORM</h1>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            name="username"
            value={user.username || ""}
            onChange={change}
          />
          {error.username && (
            <div className="text-danger">{error.username}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={user.email || ""}
            onChange={change}
          />
          {error.email && <div className="text-danger">{error.email}</div>}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={user.password || ""}
            onChange={change}
          />
          {error.password && (
            <div className="text-danger">{error.password}</div>
          )}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={user.phone || ""}
            onChange={change}
          />
          {error.phone && <div className="text-danger">{error.phone}</div>}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Hobby</label>
          <div>
            <label>
              <input
                type="checkbox"
                name="hobby"
                value="dance"
                checked={hobby.includes("dance")}
                onChange={change}
              />
              writing
            </label>
            <label className="ms-3">
              <input
                type="checkbox"
                name="hobby"
                value="reading"
                checked={hobby.includes("reading")}
                onChange={change}
              />
              running
            </label>
          </div>
          {error.hobby && <div className="text-danger">{error.hobby}</div>}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === "male"}
                onChange={change}
              />
              Male
            </label>
            <label className="ms-3">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={user.gender === "female"}
                onChange={change}
              />
              Female
            </label>
          </div>
          {error.gender && <div className="text-danger">{error.gender}</div>}
        </div>

        
        <div className="mb-3">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            name="address"
            value={user.address || ""}
            onChange={change}
          />
          {error.address && <div className="text-danger">{error.address}</div>}
        </div>

        
        <div className="mb-3">
          <label className="form-label">City</label>
          <select
            name="city"
            className="form-select"
            value={user.city || ""}
            onChange={change}
          >
            <option value="" disabled>
              --Select City--
            </option>
            {[
              "New York",
              "Los Angeles",
              "Chicago",
              "Houston",
              "Phoenix",
              "Philadelphia",
              "San Antonio",
              "San Diego",
              "Dallas",
              "San Jose",
            ].map((city, index) => (
              <option key={index} value={city}>
                {city}
              </option>
            ))}
          </select>
          {error.city && <div className="text-danger">{error.city}</div>}
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      <table className="table caption-top table-bordered ">
        <caption><h2>DATA</h2></caption>
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">username</th>
            <th scope="col">email</th>
            <th scope="col">password</th>
            <th scope="col">phone</th>
            <th scope="col">gender</th>
            <th scope="col">hobby</th>
            <th scope="col">address</th>
            <th scope="col">city</th>
            <th scope="col">action</th>
          </tr>
        </thead>
        <tbody>
          {list.length > 0 ? (
            list.map((item, index) => (
              <tr key={item.id}>
                <th scope="row">{index + 1}</th>
                <td>{item.username}</td>
                <td>{item.email}</td>
                <td>{item.password}</td>
                <td>{item.phone}</td>
                <td>{item.gender}</td>
                <td>{item.hobby}</td>
                <td>{item.address}</td>
                <td>{item.city}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => {
                      update(item.id)
                    }}
                  >
                    update
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => {
                      del(item.id)
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={10} className="text-center"><h3>No Data Found </h3></td>
              </tr>
          )}
        </tbody>
      </table>
    </>
  );
}

export default Form;

import React, { useState, useEffect, useRef } from "react";
import SimplePieChart from "../../components/charts/PieChart";
import AssignmentService from "../../services/Assignment";
import SimpleLineChart from "../../components/charts/SimpleLineChart";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]),
    [width, setWidth] = useState(100),
    spanRef = useRef();
  let inputRef = useRef();

  //console.log("data, setData", data, setData);
  const assignmentService = new AssignmentService();
  // const data = assignmentService.countBySubject();
  let countData = [];
  /* componentDidMount */
  useEffect(() => {
    countBySubject();
    //console.log("COMPONENT DID MOUNT IN Dashboard\n\n\n");
    if (inputRef) {
      inputRef.focus();
      //setWidth(inputRef.offsetWidth + 20);
    }
  }, []);

  /*  console.log("element \n\n\n", {
    ele: inputRef.current,
  }); */
  const countBySubject = async () => {
    setIsLoading(true);
    const results = await assignmentService.countBySubject();
    //console.log("data, setData in countBySubject", data, setData);

    /*  console.log(
      "COMPONENT DID MOUNT IN Dashboard -->countBySubject \n\n\n",
      results
    ); */
    setData(results);
    setIsLoading(false);
  };

  console.log("inputRef in Render", inputRef);

  let width1 = inputRef.current ? inputRef.current.offsetWidth + 20 : 100;
  //let width1 = 100;
  return (
    <div>
      <h1>Welcome to My Dashboard</h1>
      <input
        ref={(inp) => {
          console.log("inp", { inp });
          if (inp) {
            inputRef = inp;
            // inputRef.offsetWidth = 300;
          }
        }}
        //Or direct method
        //ref={inputRef}
      />
      <div ref={spanRef} style={{ width: width1, background: "#111" }}>
        This if using ref in html
      </div>

      <SimplePieChart data={data} />
      {/*  <SimpleLineChart data={data} /> */}
    </div>
  );
};
export default Dashboard;

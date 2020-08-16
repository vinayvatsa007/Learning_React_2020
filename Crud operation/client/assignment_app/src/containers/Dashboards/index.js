import React, { useState, useEffect, useRef } from "react";
import SimplePieChart from "../../components/charts/PieChart";
import AssignmentService from "../../services/Assignment";
import SimpleLineChart from "../../components/charts/SimpleLineChart";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]),
    spanRef = useRef(),
    inputRef = useRef({});

  //console.log("data, setData", data, setData);
  const assignmentService = new AssignmentService();
  // const data = assignmentService.countBySubject();
  let countData = [];
  useEffect(() => {
    countBySubject();
    console.log("COMPONENT DID MOUNT IN Dashboard\n\n\n");
    inputRef.current.focus();
  }, []);

  console.log("element \n\n\n", {
    ele: inputRef.current,
  });
  const countBySubject = async () => {
    setIsLoading(true);
    const results = await assignmentService.countBySubject();
    console.log("data, setData in countBySubject", data, setData);

    console.log(
      "COMPONENT DID MOUNT IN Dashboard -->countBySubject \n\n\n",
      results
    );
    setData(results);
    setIsLoading(false);
  };

  console.log("data in Render", data);

  return (
    <div>
      <h1>Welcome to My Dashboard</h1>
      <span ref={spanRef}>This if using ref in html</span>
      <input ref={inputRef} />
      <SimplePieChart data={data} />
      {/*  <SimpleLineChart data={data} /> */}
    </div>
  );
};
export default Dashboard;

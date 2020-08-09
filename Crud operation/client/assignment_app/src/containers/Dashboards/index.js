import React, { useState, useEffect } from "react";
import SimplePieChart from "../../components/charts/PieChart";
import AssignmentService from "../../services/Assignment";

const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState([]);

  //console.log("data, setData", data, setData);
  const assignmentService = new AssignmentService();
  // const data = assignmentService.countBySubject();
  let countData = [];
  useEffect(() => {
    countBySubject();
    console.log("COMPONENT DID MOUNT IN Dashboard\n\n\n");
  }, []);

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
      <SimplePieChart data={data} />
    </div>
  );
};
export default Dashboard;

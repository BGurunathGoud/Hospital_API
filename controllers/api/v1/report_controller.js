// Models are imported here..
const Doctor = require('../../../models/doctorModel');
const Patient = require('../../../models/patientModel');
const Report = require('../../../models/reportModel');

module.exports.create_report= async function(req,res){
  console.log("Inside report controller");

  // Here we can get doctor id 
  const doctor =req.doctor._id;
  console.log("Dr:"+ doctor);

 try{
    console.log("Inside try");

    // Here Report is created
    const report = await Report.create({
      doctor:doctor,
      patient:req.params.id,
      status:req.body.status
    });

    return res.status(200).json({
      success:true,
      report: report
    });
 }
 catch (err) {
  return res.status(401).json({
    success: false,
    msg:err.message,
  });
}
}

// Here Patient is found by id and report is sent
module.exports.all_reports= async function(req,res){
   try{
    const reports = Report.find({ "patient": req.params.id });
    reports.exec(function (err, report) {
      return res.send(report);
  })
   }
   catch (err) {
    return res.status(401).json({
      success: false,
      msg:err.message,
    });
  }
  
}

// Here Report is sent by status
module.exports.report_by_status = async (req,res) => {

  try {
      const reports = Report.find({ "status": req.params.status });
      reports.exec(function (err, rep) {
          return res.send(rep);
      });

  } catch (err) { 
      return res.status(500).json({
          message: err.message
      });
  }

}
import moment from "moment";

export const  userColumn = [
      {   
          header: "Name",
          accessorKey: "Name",
          footer: (info) => info.column.id,
        },
        // {
        
        //   header: "Age",
        //   accessorKey: "age",
        //   enableColumnFilter: true,
        // },
        {
          
          header: "Email",
          accessorKey: "email",
        },
        {
           
          header: "Mobile",
          accessorKey: "Mobile",
        },
         {
           
          header: "Role",
         accessorFn:(row)=>row?.role?.label
        },
]

 export const policyColumn = [
    {
      header: "Name",
      accessorKey: "clientName",
      footer: (info) => info.column.id,
    },
    {
      header: "Age",
      accessorKey: "number",
      enableColumnFilter: true,
    },
    {
      header: "Email",
      accessorKey: "email",
    },
    {
      header: "Address",
      accessorKey: "address",
    },
    {
      header: "dateOfBirth",
      // accessorKey: "dateOfBirth",
      accessorFn: (row) => row?.dateOfBirth ? moment(row?.dateOfBirth).format('MMMM Do YYYY, h:mm:ss a'):"",
      
    },

    {
      // accessorKey: 'PremiumDueDate',
      header: "PremiumDueDate.",
      accessorFn: (row) => row?.policyDetails[0]?.PremiumDueDate ? moment(row?.policyDetails[0]?.PremiumDueDate).format('MMMM Do YYYY, h:mm:ss a'):"",
      //  cell:(row)=>{
      //     console.log("lkfslkf",row?.getValue("policyDetails.PremiumDueDate"))
      //     return ""
      //   }
    },
    {
      // accessorKey: 'PremiumEndDate',
      header: "PremiumEndDate",
      accessorFn: (row) => row?.policyDetails[0]?.PremiumEndDate ? moment(row?.policyDetails[0]?.PremiumEndDate).format('MMMM Do YYYY, h:mm:ss a'):"",
    },
    {
      // accessorKey: 'PremiumStartDate',
      header: "PremiumStartDate",
      accessorFn: (row) => row.policyDetails[0]?.PremiumStartDate,
    },
    {
      accessorKey: "sumAssured",
      header: "sumAssured",
      accessorFn: (row) => row.policyDetails[0]?.sumAssured,
    },
      {
      // accessorKey: "name",
      header: "Nominee name",
      accessorFn: (row) => row.policyDetails[0]?.nomineeDetails[0]?.name,
    },
      {
      // accessorKey: "name",
      header: "Payment method",
      accessorFn: (row) => row.policyDetails[0]?.paymentMode?.label,
    },
      {
      // accessorKey: "name",
      header: "Policy type",
      accessorFn: (row) => row.policyDetails[0]?.paymentMode?.label,
    },
  ];
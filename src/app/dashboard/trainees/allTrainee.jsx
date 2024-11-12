import ListTable from '@/components/list-table'
import React from 'react'

const AllTrainees = () => {

    const trainees = [
        {
          id: 1,
          name: "FRANCIS ADRIAN ALTESING",
          email: "francisadrian.altesing@gmail.com",
          studentId: "202-00005",
          course: "BSIT",
          year: 4,
          deployed: true,
          evaluated: false,
          completed: false,
          avatar: "/placeholder.svg",
        },
        {
          id: 2,
          name: "JOHN WICK",
          email: "ilovedogs143@gmail.com",
          studentId: "202-00006",
          course: "BSIT",
          year: 4,
          deployed: true,
          evaluated: false,
          completed: false,
          avatar: "/placeholder.svg",
        },
        {
          id: 3,
          name: "LIONEL MESSI",
          email: "viscabarca10@gmail.com",
          studentId: "202-00007",
          course: "BSIT",
          year: 4,
          deployed: true,
          evaluated: false,
          completed: false,
          avatar: "/placeholder.svg",
        },
        {
          id: 4,
          name: "CRISTIANO RONALDO",
          email: "christiano@gmail.com",
        studentId: "202-00008",
        course: "BSIT",
        year: 4,
        deployed: false,
        evaluated: false,
        completed: false,
        avatar: "/placeholder.svg",
        },
        {
            id: 5,
            name: "CRISTIANO RONALDO",
            email: "christiano@gmail.com",
          studentId: "202-00008",
          course: "BSIT",
          year: 4,
          deployed: true,
          evaluated: false,
          completed: false,
          avatar: "/placeholder.svg",
          },
          {
            id: 6,
            name: "CRISTIANO RONALDO",
            email: "christiano@gmail.com",
          studentId: "202-00008",
          course: "BSIT",
          year: 4,
          deployed: true,
          evaluated: false,
          completed: false,
          avatar: "/placeholder.svg",
          },
          {
            id: 7,
            name: "PIRLO",
            email: "christiano@gmail.com",
          studentId: "202-00008",
          course: "BSIT",
          year: 4,
          deployed: true,
          evaluated: false,
          completed: false,
          avatar: "/placeholder.svg",
          },
          {
            id: 8,
            name: "LEWANDOWSKI",
            email: "christiano@gmail.com",
          studentId: "202-00008",
          course: "BSIT",
          year: 4,
          deployed: true,
          evaluated: false,
          completed: false,
          avatar: "/placeholder.svg",
          },
        // Add more mock data as needed
      ]
      

  return (
    <div>
      <h1 className="text-2xl font-bold">LIST OF ALL TRAINEE&apos;S</h1>

        <div>
            <ListTable data={trainees}/>
        </div>
    </div>
  )
}

export default AllTrainees
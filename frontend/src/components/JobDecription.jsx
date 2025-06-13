import React, { useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { setSingleJob } from '@/redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';

const JobDescription = () => {
   
         const params =useParams();
         const jobId=params.id;
         const {singleJob} =useSelector(store=>store.job);
         const {user}=useSelector(store=>store.auth);
         const dispatch=useDispatch();
            const isApplied = singleJob?.application?.some(app => app.applicant === user?._id) || false;
`~`
        
         useEffect(()=>{

        const fetchSingleJob=async()=>{
            try{
               const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`,{withCredentials:true});
               if(res.data.success){
                       dispatch(setSingleJob(res.data.job));
               }
            }catch(error){
           console.log(error);
            }
        }
        fetchSingleJob();
        },[jobId,dispatch, user?._id]);

    return (
        <div className='max-w-7xl mx-auto my-10 p-4'>
            {/* Header Section */}
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6'>
                <div>
                    <h1 className='font-bold text-2xl text-gray-800 mb-2'>{singleJob?.title}</h1>
                    <div className='flex items-center flex-wrap gap-2'>
                        <Badge className='text-blue-700 font-bold bg-blue-100'>{singleJob?.position} Positions</Badge>
                        <Badge className='text-[#F83002] font-bold bg-red-100'>{singleJob?.jobType}</Badge>
                        <Badge className='text-[#7209b7] font-bold bg-purple-100'>{singleJob?.salary}LPA</Badge>
                    </div>
                </div>
                <Button
                    disabled={isApplied}
                    className={`rounded-lg px-6 py-2 transition ${
                        isApplied
                            ? 'bg-gray-400 cursor-not-allowed text-white'
                            : 'bg-[#6A38C2] text-white hover:bg-[#5c2aa0]'
                    }`}
                >
                    {isApplied ? 'Already Applied' : 'Apply Now'}
                </Button>
            </div>

            {/* Divider */}
            <h1 className='border-b-2 border-gray-300 font-semibold text-lg text-gray-700 py-2 mb-6'>Job Description</h1>

            {/* Job Details */}
            <div className='space-y-4 text-gray-700 text-base'>
                <div>
                    <span className='font-semibold'>Role:</span>
                    <span className='pl-4 text-gray-800'>{singleJob?.title}</span>
                </div>
                <div>
                    <span className='font-semibold'>Location:</span>
                    <span className='pl-4 text-gray-800'>{singleJob?.location}</span>
                </div>
                <div>
                    <span className='font-semibold'>Description:</span>
                    <span className='pl-4 text-gray-800'>{singleJob?.description}</span>
                </div>
                <div>
                    <span className='font-semibold'>Experience:</span>
                  <span className='pl-4 text-gray-800'>{singleJob?.experience || 'Not Available'}</span>
                </div>
                <div>
                    <span className='font-semibold'>Salary:</span>
                    <span className='pl-4 text-gray-800'>{singleJob?.salary}LPA</span>
                </div>
                <div>
                    <span className='font-semibold'>Total Applicants:</span>
                    <span className='pl-4 text-gray-800'>{singleJob?.application?.length || 'None'}</span>
                </div>
                <div>
                    <span className='font-semibold'>Posted Date:</span>
                    <span className='pl-4 text-gray-800'>{singleJob?.createdAt.split("T")[0]}</span>
                </div>
            </div>
        </div>
    );
};

export default JobDescription;

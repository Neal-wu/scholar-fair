"use client";

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ExclamationCircleIcon } from '@heroicons/react/24/solid';

const reportSchema = z.object({
  studentName: z.string().min(1, 'Name is required'),
  studentEmail: z.string().email('Invalid email address'),
  institution: z.string().min(1, 'Institution name is required'),
  department: z.string().min(1, 'Department name is required'),
  supervisorName: z.string().min(1, "Supervisor's name is required"),
  incidentDate: z.string().min(1, 'Incident date is required'),
  description: z.string()
    .min(50, 'Please provide at least 50 characters describing the incident')
    .max(2000, 'Description must not exceed 2000 characters'),
  evidenceType: z.enum(['documentation', 'witnesses', 'emails', 'other', 'none']),
  desiredOutcome: z.string().min(1, 'Please describe your desired outcome'),
  contactConsent: z.boolean().refine(val => val === true, {
    message: 'You must consent to being contacted for follow-up',
  }),
});

type ReportFormData = z.infer<typeof reportSchema>;

export default function ReportForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ReportFormData>({
    resolver: zodResolver(reportSchema),
  });

  const onSubmit = async (data: ReportFormData) => {
    setIsSubmitting(true);
    try {
      // TODO: Implement actual submission logic here
      console.log('Form data:', data);
      setSubmitSuccess(true);
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitSuccess) {
    return (
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">Report Submitted Successfully</h3>
            <div className="mt-2 text-sm text-green-700">
              <p>Thank you for submitting your report. We take all reports seriously and will review your case carefully.</p>
              <button
                onClick={() => setSubmitSuccess(false)}
                className="mt-4 text-sm font-medium text-green-800 hover:text-green-600"
              >
                Submit another report
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="bg-white shadow-sm rounded-lg p-6">
        <div className="space-y-6">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="studentName" className="block text-sm font-medium text-gray-700">
                Your Name
              </label>
              <div className="mt-1 relative">
                <input
                  type="text"
                  id="studentName"
                  {...register('studentName')}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.studentName ? 'border-red-300' : ''
                  }`}
                />
                {errors.studentName && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.studentName && (
                <p className="mt-2 text-sm text-red-600">{errors.studentName.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="studentEmail" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <div className="mt-1 relative">
                <input
                  type="email"
                  id="studentEmail"
                  {...register('studentEmail')}
                  className={`block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm ${
                    errors.studentEmail ? 'border-red-300' : ''
                  }`}
                />
                {errors.studentEmail && (
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                  </div>
                )}
              </div>
              {errors.studentEmail && (
                <p className="mt-2 text-sm text-red-600">{errors.studentEmail.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="institution" className="block text-sm font-medium text-gray-700">
                Institution
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="institution"
                  {...register('institution')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {errors.institution && (
                <p className="mt-2 text-sm text-red-600">{errors.institution.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  id="department"
                  {...register('department')}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {errors.department && (
                <p className="mt-2 text-sm text-red-600">{errors.department.message}</p>
              )}
            </div>
          </div>

          <div>
            <label htmlFor="supervisorName" className="block text-sm font-medium text-gray-700">
              Supervisor's Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                id="supervisorName"
                {...register('supervisorName')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {errors.supervisorName && (
              <p className="mt-2 text-sm text-red-600">{errors.supervisorName.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="incidentDate" className="block text-sm font-medium text-gray-700">
              Date of Incident
            </label>
            <div className="mt-1">
              <input
                type="date"
                id="incidentDate"
                {...register('incidentDate')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            {errors.incidentDate && (
              <p className="mt-2 text-sm text-red-600">{errors.incidentDate.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description of the Incident
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                rows={5}
                {...register('description')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Please provide a detailed description of the incident..."
              />
            </div>
            {errors.description && (
              <p className="mt-2 text-sm text-red-600">{errors.description.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="evidenceType" className="block text-sm font-medium text-gray-700">
              Type of Evidence Available
            </label>
            <div className="mt-1">
              <select
                id="evidenceType"
                {...register('evidenceType')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="documentation">Documentation</option>
                <option value="witnesses">Witnesses</option>
                <option value="emails">Emails</option>
                <option value="other">Other</option>
                <option value="none">No Evidence Available</option>
              </select>
            </div>
            {errors.evidenceType && (
              <p className="mt-2 text-sm text-red-600">{errors.evidenceType.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="desiredOutcome" className="block text-sm font-medium text-gray-700">
              Desired Outcome
            </label>
            <div className="mt-1">
              <textarea
                id="desiredOutcome"
                rows={3}
                {...register('desiredOutcome')}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="What would you like to see happen as a result of this report?"
              />
            </div>
            {errors.desiredOutcome && (
              <p className="mt-2 text-sm text-red-600">{errors.desiredOutcome.message}</p>
            )}
          </div>

          <div className="relative flex items-start">
            <div className="flex h-5 items-center">
              <input
                id="contactConsent"
                type="checkbox"
                {...register('contactConsent')}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="contactConsent" className="font-medium text-gray-700">
                Contact Consent
              </label>
              <p className="text-gray-500">
                I consent to being contacted for follow-up information about this report.
              </p>
            </div>
          </div>
          {errors.contactConsent && (
            <p className="mt-2 text-sm text-red-600">{errors.contactConsent.message}</p>
          )}
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Report'}
          </button>
        </div>
      </div>
    </form>
  );
} 
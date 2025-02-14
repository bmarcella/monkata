import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Phone, Mail, MapPin, FileText, Calendar, Building2 } from 'lucide-react';
import { HaitiState } from '../../../../../../common/index/HaitiCities';
const employeeSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  title_prof: z.string().optional(),
  sexe: z.string().optional(),
  profile: z.string().optional(),
  annee_debut: z.number().min(1900).max(new Date().getFullYear()).optional(),
  telephone_a: z.string().regex(/^\+?[0-9\s-()]{8,}$/, 'Invalid phone number').optional(),
  telephone_b: z.string().regex(/^\+?[0-9\s-()]{8,}$/, 'Invalid phone number').optional(),
  email_contact: z.string().email('Invalid email address').optional(),
  country: z.string().optional(),
  state: z.string().optional(),
  city: z.string().optional(),
  nin: z.string().optional(),
  nif: z.string().optional(),
  passport: z.string().optional(),
  street: z.string().optional(),
  disponibilte: z.enum(['Consultant', 'Temps_partiel', 'Temps_plein', 'Non_disponible', 'Tout']).optional(),

});

type EmployeeFormData = z.infer<typeof employeeSchema>;

export default function EmployeeForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EmployeeFormData>({
    resolver: zodResolver(employeeSchema),
  });

  const onSubmit = (data: EmployeeFormData) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="bg-white rounded-xl  p-8 space-y-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Employee Information</h2>

        {/* Personal Information Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4" />
                Prénom  *
              </label>
              <input
                {...register('firstName')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter first name"
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <User className="w-4 h-4" />
                Nom *
              </label>
              <input
                {...register('lastName')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter last name"
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Building2 className="w-4 h-4" />
                Professional Title
              </label>
              <input
                {...register('title_prof')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter professional title"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Calendar className="w-4 h-4" />
                Start Year
              </label>
              <input
                type="number"
                {...register('annee_debut', { valueAsNumber: true })}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter start year"
              />
            </div>
          </div>
        </div>

        {/* Contact Information Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Contact Information</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4" />
                Primary Phone
              </label>
              <input
                {...register('telephone_a')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter primary phone"
              />
              {errors.telephone_a && (
                <p className="mt-1 text-sm text-red-600">{errors.telephone_a.message}</p>
              )}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Phone className="w-4 h-4" />
                Secondary Phone
              </label>
              <input
                {...register('telephone_b')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter secondary phone"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <Mail className="w-4 h-4" />
                Email
              </label>
              <input
                {...register('email_contact')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter email address"
              />
              {errors.email_contact && (
                <p className="mt-1 text-sm text-red-600">{errors.email_contact.message}</p>
              )}
            </div>

          
          </div>
        </div>

        {/* Location Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Location</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4" />  Pays
              </label>
              <select
                {...register('country')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                <option value="Haiti">Haiti</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4" />  Département
              </label>
              <select
                {...register('state')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                {  HaitiState.map((state)=>{
                 return <option value={state}>{state}</option> 
                })  } 
              </select>
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4" />
                City
              </label>
              <input
                {...register('city')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter city"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <MapPin className="w-4 h-4" />
                Street Address
              </label>
              <input
                {...register('street')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter street address"
              />
            </div>
          </div>
        </div>

        {/* Identification Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Identification</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FileText className="w-4 h-4" />
                NIN
              </label>
              <input
                {...register('nin')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter NIN"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FileText className="w-4 h-4" />
                NIF
              </label>
              <input
                {...register('nif')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter NIF"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                <FileText className="w-4 h-4" />
                Passport
              </label>
              <input
                {...register('passport')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter passport number"
              />
            </div>
          </div>
        </div>

        {/* Employment Details Section */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">Employment Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-1">
                Availability
              </label>
              <select
                {...register('disponibilte')}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="Consultant">Consultant</option>
                <option value="Temps_partiel">Temps partiel</option>
                <option value="Temps_plein">Temps Plein</option>
              </select>
            </div>

          </div>
        </div>

        <div className="flex justify-end pt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg
                     hover:bg-blue-700 active:bg-blue-800 transition-colors
                     shadow-md hover:shadow-lg"
          >
            Save Employee
          </button>
        </div>
      </div>
    </form>
  );
}
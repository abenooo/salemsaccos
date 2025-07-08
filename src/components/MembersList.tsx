import React, { useState, useEffect } from 'react'
import { Users, Search, Calendar, Phone, MapPin, FileText, Eye, X } from 'lucide-react'
import { supabase, type Member } from '../lib/supabase'

const MembersList: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([])
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMembers()
  }, [])

  useEffect(() => {
    filterMembers()
  }, [searchTerm, members])

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      setMembers(data || [])
    } catch (error) {
      console.error('Error fetching members:', error)
    } finally {
      setLoading(false)
    }
  }

  const filterMembers = () => {
    if (!searchTerm.trim()) {
      setFilteredMembers(members)
      return
    }

    const filtered = members.filter(member =>
      member.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.phone_number.includes(searchTerm) ||
      member.city_kebele.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.woreda.toLowerCase().includes(searchTerm.toLowerCase())
    )

    setFilteredMembers(filtered)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('am-ET', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const MemberDetailModal = ({ member, onClose }: { member: Member; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">የአባል ዝርዝር መረጃ</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Personal Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">የግል መረጃ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">ሙሉ ስም:</span>
                <span className="ml-2">{member.full_name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">የአባት ስም:</span>
                <span className="ml-2">{member.father_name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">የአያት ስም:</span>
                <span className="ml-2">{member.grandfather_name}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">ጾታ:</span>
                <span className="ml-2">{member.gender === 'male' ? 'ወንድ' : 'ሴት'}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">የጋብቻ ሁኔታ:</span>
                <span className="ml-2">
                  {member.marital_status}
                </span>
              </div>
              <div>
                <span className="font-medium text-gray-700">ስራ/ትምህርት:</span>
                <span className="ml-2">{member.occupation}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">የግኃት መረጃ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">ክልል:</span>
                <span className="ml-2">{member.region}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">ወረዳ:</span>
                <span className="ml-2">{member.woreda}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">ከተማ/ቀበሌ:</span>
                <span className="ml-2">{member.city_kebele}</span>
              </div>
              <div>
                <span className="font-medium text-gray-700">ስልክ ቁጥር:</span>
                <span className="ml-2">{member.phone_number}</span>
              </div>
              {member.referrer_phone && (
                <div>
                  <span className="font-medium text-gray-700">የመሳቢያ ስልክ:</span>
                  <span className="ml-2">{member.referrer_phone}</span>
                </div>
              )}
            </div>
          </div>

          {/* ID Information */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">የመታወቂያ መረጃ</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-gray-700">የፋይዳ መታወቂያ FCN:</span>
                <span className="ml-2">{member.id_fcn}</span>
              </div>
            </div>
          </div>

          {/* Digital Signature */}
          {member.digital_signature_url && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-gray-900 mb-3">ዲጂታል ፊርማ</h3>
              <img
                src={member.digital_signature_url}
                alt="Digital Signature"
                className="max-w-xs border border-gray-300 rounded"
              />
            </div>
          )}

          {/* Registration Date */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-900 mb-3">የምዝገባ ቀን</h3>
            <p className="text-sm text-gray-700">{formatDate(member.created_at)}</p>
          </div>
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg">
        <div className="p-6 border-b">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 flex items-center">
                <Users className="w-6 h-6 mr-2" />
                የተመዘገቡ አባላት
              </h1>
              <p className="text-gray-600 mt-1">
                ጠቅላላ {members.length} አባላት ተመዝግበዋል
              </p>
            </div>
            
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="ስም፣ ስልክ ቁጥር ወይም አድራሻ ይፈልጉ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent w-full md:w-80"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ስም
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ስልክ ቁጥር
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  አድራሻ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ጾታ
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  የምዝገባ ቀን
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  ተግባር
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      {member.full_name}
                    </div>
                    <div className="text-sm text-gray-500">
                      {member.father_name} {member.grandfather_name}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Phone className="w-4 h-4 mr-1" />
                      {member.phone_number}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <MapPin className="w-4 h-4 mr-1" />
                      {member.city_kebele}, {member.woreda}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {member.gender === 'male' ? 'ወንድ' : 'ሴት'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-900">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(member.created_at)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => setSelectedMember(member)}
                      className="flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      ዝርዝር ይመልከቱ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredMembers.length === 0 && (
            <div className="text-center py-12">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">
                {searchTerm ? 'ምንም ውጤት አልተገኘም' : 'ምንም አባላት እስካሁን አልተመዘገቡም'}
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedMember && (
        <MemberDetailModal
          member={selectedMember}
          onClose={() => setSelectedMember(null)}
        />
      )}
    </div>
  )
}

export default MembersList
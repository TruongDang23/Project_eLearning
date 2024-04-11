//This is information screen of admin
import { GeneralFooter, HeaderAfterLogin } from '~/components/general/index'
import './information.css'
import 'bootstrap/dist/css/bootstrap.css'
import Avatar from '@mui/material/Avatar'
import avt from '~/assets/avatar.jpg'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import Button from '@mui/material/Button'

function Information() {
  return (
    <>
      <HeaderAfterLogin/>

      <div style={{ backgroundColor:'#F1F3F5' }}>
        <div className="row justify-content-around" style={{ paddingTop: '70px', paddingBottom: '70px' }}>
          <div className="col-4" style={{ display:'flex', flexDirection:'column', alignItems:'center', backgroundColor:'white', borderRadius:'10px' }}>
            <Avatar
              alt="Avatar"
              src={avt}
              sx={{ width: 200, height: 200, marginTop:'20px' }}
            />

            <div style={{ width: '100%', marginTop: '30px' }}>
              <label style={{ textAlign:'right' }}>User ID:</label>
              <input type="text" className="form-control" id="user_id" placeholder="admin005GN" style={{ borderWidth: '2px', borderRadius: '15px', borderColor:'black', height:'50px' }}/>
            </div>

            <div style={{ width: '100%', marginTop: '30px' }}>
              <label style={{ textAlign:'right' }}>Full Name:</label>
              <input type="text" className="form-control" id="full_name" placeholder="Đặng Quang Trường" style={{ borderWidth: '2px', borderRadius: '15px', borderColor:'black', height:'50px' }}/>
            </div>

            <div style={{ width: '100%', marginTop: '30px', display:'flex', alignItems:'center' }}>
              <label style={{ textAlign: 'right', marginRight:'30px' }}>Date of Birth:</label>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={['DatePicker']}>
                  <DatePicker label="Date of Birth" format='DD/MM/YYYY' id="dob" />
                </DemoContainer>
              </LocalizationProvider>
            </div>

            <div style={{ width: '100%', marginTop: '30px' }}>
              <label style={{ textAlign:'right' }}>Location:</label>
              <br/>
              <TextField id="street" label="Street" variant="standard" sx={{ width:'32%', marginRight:'5px' }}/>
              <TextField id="province" label="Province" variant="standard" sx={{ width:'32%', marginRight:'5px' }} />
              <TextField id="country" label="Country" variant="standard" sx={{ width:'32%', marginRight:'5px' }} />
            </div>

            <div style={{ width: '100%', marginTop: '30px', display: 'flex', alignItems: 'center' }}>
              <label style={{ textAlign: 'right', marginRight: '30px' }}>Language:</label>
              <Autocomplete
                disablePortal
                id="language"
                options={languages}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Language" />}
              />
            </div>

            <div style={{ width: '100%', marginTop: '30px' }}>
              <label style={{ textAlign: 'right' }}>Social Networks:</label>
              <ul className="list-group list-group-flush">
                <a href="https://www.facebook.com/profile.php?id=100040342220491" className="list-group-item list-group-item-action">https://www.facebook.com/profile.php?id=100040342220491</a>
                <a href="https://github.com/TruongDang23" className="list-group-item list-group-item-action">https://github.com/TruongDang23</a>
              </ul>
              <a href="#" style={{ marginLeft:'80%' }}>Add new</a>
            </div>

            <div style={{ width: '100%', marginTop: '30px' }}>
              <label style={{ textAlign:'right' }}>Activity Status:</label>
              <input type="text" className="form-control" id="activity_status" placeholder="Working" style={{ borderWidth: '2px', borderRadius: '15px', borderColor:'black', height:'50px' }}/>
            </div>

            <div className="button_custom">
              <input className="btn btn-primary" type="submit" value="SAVE" id="btnSave"/>
              <button type="button" className="btn btn-outline-danger" id="btnCancel">CANCEL</button>
            </div>
          </div>

          <div className="col-4" style={{ backgroundColor: 'yellow' }}>
            One of two columns
          </div>
        </div>
      </div>

      <GeneralFooter/>
    </>
  )
}

const languages = [
  { label: 'English' },
  { label: 'Spanish' },
  { label: 'Mandarin Chinese' },
  { label: 'Hindi' },
  { label: 'French' },
  { label: 'Standard Arabic' },
  { label: 'Bengali' },
  { label: 'Russian' },
  { label: 'Portuguese' },
  { label: 'Urdu' },
  { label: 'Indonesian' },
  { label: 'German' },
  { label: 'Japanese' },
  { label: 'Swahili' },
  { label: 'Marathi' },
  { label: 'Telugu' },
  { label: 'Turkish' },
  { label: 'Tamil' },
  { label: 'Yoruba' },
  { label: 'Italian' },
  { label: 'Vietnamese' },
  { label: 'Thai' },
  { label: 'Korean' },
  { label: 'Javanese' },
  { label: 'Filipino' },
  { label: 'Amharic' },
  { label: 'Oromo' },
  { label: 'Burmese' },
  { label: 'Swedish' },
  { label: 'Dutch' },
  { label: 'Pashto' },
  { label: 'Ukrainian' },
  { label: 'Gujarati' },
  { label: 'Polish' },
  { label: 'Xhosa' },
  { label: 'Malayalam' },
  { label: 'Sindhi' },
  { label: 'Farsi (Persian)' },
  { label: 'Romanian' },
  { label: 'Maithili' },
  { label: 'Hausa' },
  { label: 'Burmese' },
  { label: 'Kannada' },
  { label: 'Serbo-Croatian' },
  { label: 'Nepali' },
  { label: 'Sinhala' },
  { label: 'Uzbek' },
  { label: 'Kurdish' },
  { label: 'Bhojpuri' },
  { label: 'Zulu' },
  { label: 'Fulfulde' },
  { label: 'Tagalog' },
  { label: 'Yiddish' },
  { label: 'Igbo' },
  { label: 'Azerbaijani' },
  { label: 'Slovak' },
  { label: 'Tigrinya' },
  { label: 'Danish' },
  { label: 'Hungarian' },
  { label: 'Latvian' },
  { label: 'Czech' },
  { label: 'Tswana' },
  { label: 'Akan' },
  { label: 'Icelandic' },
  { label: 'Greek' },
  { label: 'Tatar' },
  { label: 'Catalan' },
  { label: 'Slovenian' },
  { label: 'Kinyarwanda' },
  { label: 'Lithuanian' },
  { label: 'Albanian' },
  { label: 'Norwegian' },
  { label: 'Bosnian' },
  { label: 'Georgian' },
  { label: 'Malagasy' },
  { label: 'Armenian' },
  { label: 'Sundanese' },
  { label: 'Macedonian' },
  { label: 'Pashto' },
  { label: 'Bulgarian' },
  { label: 'Tajik' },
  { label: 'Chichewa' },
  { label: 'Lao' },
  { label: 'Kinyarwanda' },
  { label: 'Kazakh' },
  { label: 'Cebuano' },
  { label: 'Kurdish' },
  { label: 'Corsican' },
  { label: 'Somali' },
  { label: 'Luxembourgish' },
  { label: 'Fijian' },
  { label: 'Haitian Creole' },
  { label: 'Maltese' },
  { label: 'Gaelic (Scottish)' },
  { label: 'Tsonga' },
  { label: 'Sesotho' },
  { label: 'Kirundi' }
]

export default Information

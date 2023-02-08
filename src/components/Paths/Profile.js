import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './css/Profile.css'
import User from '../../images/User.png'
import Select from 'react-select'
import { Oval } from 'react-loader-spinner'
import { MdOutlineEmail } from "react-icons/md";
import { BiUserPin } from "react-icons/bi";
import { GoAlert } from "react-icons/go";
import { FaCloudUploadAlt } from "react-icons/fa";
import { BiBuildings } from "react-icons/bi";
import { FaCity } from "react-icons/fa";
import { MdOutlinePlace, MdCancel } from "react-icons/md";
import { CgCalendarDates } from "react-icons/cg";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { RiLockPasswordLine } from "react-icons/ri"
import { BsTelephone } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { DeleteFile, EditarUsuario, GetUserUrlImage, ImageUpload, Login, MudarSenha,  NotificarErro, NotificarEvento, NotificarInfo, UpdateUser } from '../utils/Utilidades'
import { Estados } from '../../Cidades';


const Profile = (props) => {

    document.body.style.zoom = "100%";

    const navigate = useNavigate();
    //IMAGE UPOLOAD 

    const [imageUpload, setImageUpload] = useState(null);
    const [Refresh, setRefresh] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [UpdatingLoading, setUpdatingLoading] = useState(false);
    const [imageUrls, setImageUrls] = useState();
    const [MensagemErroImageUpload,] = useState('');


    const uploadFile = () => {
        setLoading(true)
        if (imageUpload == null) return;
        ImageUpload(`images/notesApp/${props.Usuario.uid}`, imageUpload).then(() => {
            NotificarInfo("Foto de Perfil Atualizada!")
            setRefresh(!Refresh)
        })
    };

    ///


    const [Email, setEmail] = useState(props.Usuario.email || '');
    const [Nome, setNome] = useState(props.Usuario.Nome || '');
    const [Sobrenome, setSobrenome] = useState('');
    const [Cidade, setCidade] = useState('');
    const [Estado, setEstado] = useState('');
    const [Nascimento, setNascimento] = useState('');
    const [Apelido, setApelido] = useState('');
    const [Mensagem, setMensagem] = useState('');
    const [Filled, setFilled] = useState(false);
    const [NovaSenha, setNovaSenha] = useState('');
    const [SenhaMensagem, setSenhaMensagem] = useState('');
    const [SenhaAtual, setSenhaAtual] = useState('');
    const [Telefone, setTelefone] = useState('');
    const [TelefoneMensagem, setTelefoneMensagem] = useState('');
    const [EstadosOpcoes, setEstadosOpcoes] = useState([]);
    const [CidadesOpcoes, setCidadesOpcoes] = useState([]);




    useEffect(() => {
        const User = { ...props.Usuario }

        setEmail(User.email)
        setNome(User.nome)
        setApelido(User.apelido)
        setNascimento(User.nascimento)
        setEstado(User.estado)
        setCidade(User.cidade)
        setSobrenome(User.sobrenome)
        setTelefone(User.numero)

        setLoading(true)

        GetUserUrlImage(`images/notesApp/${props.Usuario.uid}`).then((url) => {
            setImageUrls(url);
            setImageUpload('')
            setLoading(false)
        }).catch((error) => {
            console.log("Retorno Erro", error)
            setImageUrls('');
            setImageUpload('')
            setLoading(false)
        })

    }, [props.Usuario, imageUrls, Refresh, props.Usuario.email, props.Usuario.nome, props.Usuario.docID, props.Usuario.cidade, props.Usuario.Apelido]);



    const handleSair = () => {

        navigate('../../')
    }

    if (props.LoggedUser.email === 'Vazio') {
        handleSair()
    }

    const HandleSubmitCadastro = (e) => {
        e.preventDefault()
        if (Filled) {
            setUpdatingLoading(true)
            setTimeout(() => {
                const EditedUser = {
                    docID: props.Usuario.docID,
                    uid: props.Usuario.uid,
                    email: props.LoggedUser.email,
                    nome: Nome,
                    cidade: Cidade,
                    estado: Estado,
                    sobrenome: Sobrenome,
                    nascimento: Nascimento,
                    apelido: Apelido,
                    numero: Telefone
                }
                EditarUsuario(props.Usuario.uid, EditedUser)
                UpdateUser(EditedUser).then(() => {
                    setUpdatingLoading(false)
                    showUpdatedMessage()
                    NotificarEvento("Dados Atualizados!")
                })

            }, 2500);

        }
    }

    const showUpdatedMessage = () => {
        setMensagem('Dados Atualizados')
        setTimeout(() => {
            setMensagem('')
        }, 1500);
    }

    const handleChangePicture = (file) => {
        setImageUpload(file);
    }



    useEffect(() => {

        if (Nome && Sobrenome && Cidade && Estado && Telefone) {
            setFilled(true)
        } else {
            setFilled(false)
        }

    }, [Nome, Sobrenome, Cidade, Estado, Telefone]);

    const handleChangePassword = () => {
        if (NovaSenha) {
            Login(Email, SenhaAtual).then(() => {
                setUpdatingLoading(true)
                MudarSenha(NovaSenha).then(() => {
                    
                    setSenhaMensagem('Senha Atualizada')
                    NotificarEvento('Senha Atualizada')
                    setUpdatingLoading(false)
                    setTimeout(() => {
                        setSenhaMensagem('')
                        setSenhaAtual('')
                        setNovaSenha('')

                    }, 1500);
                }).catch((error) => {
                    //console.log("ERRADO Atualização Senha", error.code)
                    setUpdatingLoading(false)
                    let SenhaFraca = error.code.includes("password");
                    if (SenhaFraca){
                        setSenhaMensagem('A senha deve ter pelo menos 6 caracteres')
                        NotificarErro('A senha deve ter pelo menos 6 caracteres')
                    }
                        

                    setTimeout(() => {
                        setSenhaMensagem('')
                    }, 3000);
                })
            }
            ).catch(() => {
                setSenhaMensagem('Senha Atual incorreta')
                NotificarErro('Senha Atual incorreta')
                setTimeout(() => {
                    setSenhaMensagem('')
                }, 3000);
            })
        } else {

        }
    }

    const handleChangeNumber = () => {
        if (Telefone && Telefone.length >= 10) {
            setUpdatingLoading(true)
            const EditedUser = { ...props.Usuario, numero: Telefone }
            UpdateUser(EditedUser).then(() => {
                setUpdatingLoading(false)
                setTelefoneMensagem('Telefone Atualizado')
                NotificarEvento("Telefone Atualizado!")
                setTimeout(() => { setTelefoneMensagem('') }, 2000);
            })
            EditarUsuario(props.LoggedUser.uid, EditedUser)
        } else if (Telefone.length < 10 && Telefone.length > 0) {
            setTelefoneMensagem('Mínimo 10 digitos')
            NotificarErro('Mínimo 10 digitos')
            setTimeout(() => { setTelefoneMensagem('') }, 2000);
        } else if (Telefone.length === 0) {
            setTelefoneMensagem('O telefone não pode ser vazio')
            NotificarErro('O telefone não pode ser vazio')
            setTimeout(() => { setTelefoneMensagem('') }, 2000);
        }
    }


    const ApagarFotoDeUsuario = () => {
        setLoading(true)
        DeleteFile(`images/notesApp/${props.Usuario.uid}`).then(() => {
            setImageUrls('');
            setImageUpload('')
            setLoading(false)
            NotificarEvento("Foto de Perfil Removida!")
        }).catch((error) => {
            setImageUrls('');
            setImageUpload('')
            setLoading(false)
        })

    }


    useEffect(() => {
        setEstadosOpcoes(Estados.map(Estado => { return { value: Estado.nome, label: Estado.nome } }))
    }, []);

    useEffect(() => {
        if (Estado) {
            const EstadoEscolhido = Estados.find(EstadoMap => { return EstadoMap.nome === Estado })

            if (Cidade) {
                const CidadesDoEstado = EstadoEscolhido.cidades.map(CidadeMap => { return CidadeMap })
                const CidadeDoEstado = CidadesDoEstado.find(CidadeFilter => { return CidadeFilter === Cidade })
                if (!CidadeDoEstado)
                    setCidade('')
            }

            setCidadesOpcoes(EstadoEscolhido.cidades.map(Cidade => { return { value: Cidade, label: Cidade } }))

        }
    }, [Estado, Cidade]);





    return (

        <div className="ConteudoProfile">
            <div className='SidebarProfile'>
                {!Loading && !UpdatingLoading && <div className='ProfilePicDiv'>
                    <img className="ProfileUserPhoto" src={imageUrls || User} alt="" />
                    {imageUpload && <div className='UploadButtons'>
                        <button className='upload' onClick={uploadFile}>Upload <FaCloudUploadAlt /> </button>
                        <button className='uploadCancel' onClick={e => setImageUpload(null)}>Cancelar <MdCancel /> </button>
                    </div>}




                    {MensagemErroImageUpload && <span className='UploadErro'> <GoAlert /> {MensagemErroImageUpload}</span>}

                    {!imageUpload &&
                        <label className='PhotoInputLabel' >
                            Trocar foto
                            <input id="inputTag" accept="image/apng, image/avif, image/gif, image/jpeg, image/png, image/svg+xml, image/webp" type="file" onChange={(event) => { handleChangePicture(event.target.files[0]); }} />
                        </label>
                    }

                    {imageUrls && <label onClick={ApagarFotoDeUsuario} className='PhotoInputLabelRemove'>Remover Foto</label>}

                    <h3 className='NomeTitulo'>{`${Nome} ${Sobrenome}`}</h3>


                    {Mensagem && <span className='UpdatedMessage'> <AiOutlineCheckCircle /> {Mensagem}</span>}
                </div>}

                {Loading && !UpdatingLoading && <div className='ProfilePicDivLoading'><Oval></Oval></div>}

                {UpdatingLoading && <div className='UpdatindLoading'><Oval></Oval> Atualizando Dados</div>}


            </div>

            <form onSubmit={HandleSubmitCadastro} className="ProfileForm">

                <label className='InputLabelProfile' > <MdOutlineEmail /> Email</label>
                <input name="Email" disabled className='ProfileInput' type="text" defaultValue={Email} />

                <label className='InputLabelProfile' > <BiUserPin />  Nome</label>
                <div className='NomeCompleto'>
                    <input value={Nome} name='Nome' className='ProfileInput Nome' type="text" placeholder='Nome' onChange={e => setNome(e.target.value)} />
                    <input value={Sobrenome} name='Sobrenome' className='ProfileInput Sobrenome' type="text" placeholder='Sobrenome' onChange={e => setSobrenome(e.target.value)} />
                </div>



                <div className='DoubleColumnProfile'>
                    <div className='ColunaDoubleRow'>
                        <label className='InputLabelProfile' > <CgCalendarDates /> Data de Nascimento</label>
                        <input value={Nascimento} name="Nascimento" className='ProfileInput NascimentoSelect' type="date" onChange={e => setNascimento(e.target.value)} />
                    </div>
                    <div className='ColunaDoubleRow'>
                        <label className='InputLabelProfile' > <BiBuildings /> Apelido</label>
                        <input value={Apelido} className='ProfileInput ApelidoInput ' placeholder='Apelido' type="text" name='Apelido' onChange={e => setApelido(e.target.value)} />
                    </div>

                </div>



                <div className='DoubleColumnProfile'>
                    <div className='ColunaDoubleRow'>
                        <label className='InputLabelProfile' ><MdOutlinePlace /> Estado</label>
                        <Select
                            maxMenuHeight='120px'
                            value={{ value: Estado, label: Estado }}
                            className='SelectReactProfile'
                            name='Estado'
                            options={EstadosOpcoes}
                            onChange={e => setEstado(e.value)}>
                        </Select>
                    </div>

                    <div className='ColunaDoubleRow'>
                        <label className='InputLabelProfile' > <FaCity />Cidade</label>
                        <Select
                            maxMenuHeight='120px'
                            value={{ value: Cidade, label: Cidade }}
                            className='SelectReactProfile'
                            name='Cidade'
                            options={CidadesOpcoes}
                            onChange={e => setCidade(e.value)}>
                        </Select>
                    </div>
                </div>



                {Filled && <div className='UpdateButton'><button className='ProfileButton'>Atualizar Dados</button></div>}




            </form>

            <div className='rigthSidebarProfile'>

                <div className='PasswordAndPhone'>

                    <div className='changePasswordDiv'>
                        <label className='InputLabelProfile' > <RiLockPasswordLine /> Atualizar Senha</label>
                        <input value={SenhaAtual} name="Email" className='ProfileInput' type="password" placeholder='Senha Atual' onChange={e => setSenhaAtual(e.target.value)} />
                        <input value={NovaSenha} name="Email" className='ProfileInput' type="password" placeholder='Nova Senha' onChange={e => setNovaSenha(e.target.value)} />


                        {SenhaMensagem && <span className='MensagemSenha'>{SenhaMensagem}</span>}
                        <button onClick={handleChangePassword} className='ProfileButton'>Atualizar Senha</button>

                    </div>

                    <div className='phoneDiv'>
                        <label className='InputLabelProfile' > <BsTelephone /> Telefone</label>

                        <PhoneInput
                            inputStyle={{ width: '100%', marginRight: '0', fontFamily: 'Kanit', fontSize: '12px' }}
                            containerStyle={{ margin: '0', padding: '0', width: '100%', fontSize: '12px' }}
                            country={'br'}
                            value={Telefone}
                            onChange={e => setTelefone(e)}
                        />

                        {TelefoneMensagem && <span className='MensagemSenha'>{TelefoneMensagem}</span>}
                        <button onClick={handleChangeNumber} className='ProfileButton'>Adicionar número</button>
                    </div>



                </div>

            </div>


        </div>




    )
}

const ConnectedProfile = connect((state) => {
    return {
        LoggedUser: state.LoggedUser,
        Usuario: state.Usuarios.find(Usuario => {
            return Usuario.email === state.LoggedUser.email
        })
    }
})(Profile)

export default ConnectedProfile
import $ from 'jquery'

const defaultConfig = {
  nNode: 10,
  algorithm: 'nn',
  acoConfig: {
    alpha: 0,
    beta: 0,
    rho: 0,
    pher: 0,
    Q: 0,
  },
}

const algorithm = {
  nn: 'nn',
  aco: 'aco',
  opt: 'opt',
}

const nNodeId = '#node-number'
const algorithmDropdown = '#algorithm'
const alphaId = '#alpha'
const betaId = '#beta'
const rhoId = '#rho'
const pherId = '#pher'
const qId = '#q'
const acoConfig = [alphaId, betaId, rhoId, pherId, qId]
const refreshBtn = 'button#refresh'
const runBtn = 'button#run'


/**
 * Change input ACO config input's state
 * @param {Boolean} state
 */
const disableAcoConfigInput = (state) => {
  acoConfig.forEach(id => {
    $(id).prop('disabled', state)
  })
}

const enableAcoConfig = () => disableAcoConfigInput(false)
const disableAcoConfig = () => disableAcoConfigInput(true)

const getConfig = () => {
  return {
    nNode: $(nNodeId).val(),
    algorithm: $(algorithmDropdown).val(),
    acoConfig: {
      alpha: $(alphaId).val(),
      beta: $(betaId).val(),
      rho: $(rhoId).val(),
      pher: $(pherId).val(),
      Q: $(qId).val(),
    },
  }
}

const setDefaultConfig = () => {
  $(nNodeId).val(defaultConfig.nNode)
  $(algorithmDropdown).val(defaultConfig.algorithm)
  $(alphaId).val(defaultConfig.acoConfig.alpha)
  $(betaId).val(defaultConfig.acoConfig.beta)
  $(rhoId).val(defaultConfig.acoConfig.rho)
  $(pherId).val(defaultConfig.acoConfig.pher)
  $(qId).val(defaultConfig.acoConfig.Q)
  disableAcoConfigInput(true)
}

$(algorithmDropdown).on('change', ({ target }) => {
  if (target.val() === algorithm.aco) {
    enableAcoConfig()
  } else {
    disableAcoConfig()
  }
})

export default () => {
  setDefaultConfig()
  $(refreshBtn).on('click', () => setDefaultConfig())
  $(runBtn).on('click', () => getConfig())
}

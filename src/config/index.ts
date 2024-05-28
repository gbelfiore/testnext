import stg from './staging.json'
import localhost from './localhost.json'
import pt_br_dc from './pt_br_dc.json'
import pt_br_td from './pt_br_td.json'
import es_mx_dc from './es_mx_dc.json'
import es_mx_td from './es_mx_td.json'
import fr_fr_td from './fr_fr_td.json'
import fr_fr_dc from './fr_fr_dc.json'
import pt_pt_td from './pt_pt_td.json'
import en_au_td from './en_au_td.json'
import en_au_dc from './en_au_dc.json'
import it_it_dc from './it_it_dc.json'
import it_it_td from './it_it_td.json'
import it_it_pq from './it_it_pq.json'
import it_it_vf from './it_it_vf.json'
import es_cl_td from './es_cl_td.json'
import es_ar_td from './es_ar_td.json'
import es_co_td from './es_co_td.json'
import en_za_td from './en_za_td.json'
import fr_be_td from './fr_be_td.json'
import es_pe_td from './es_pe_td.json'
import es_ec_td from './es_ec_td.json'
import en_nz_dc from './en_nz_dc.json'
import en_nz_td from './en_nz_td.json'
import es_es_td from './es_es_td.json'
import es_es_dc from './es_es_dc.json'

const getConfigForCountry = (host?: string | null, country?: string | null) => {
  host = host ?? globalThis.location?.host

  if (!country && globalThis.location) {
    const urlParams = new URLSearchParams(globalThis.location.search)
    country = urlParams.get('country')
  }

  let config

  // if (country) {
  //   if (country == 'br') {
  //     // SHOPFULLY BRAZIL
  //     config = pt_br_dc
  //   } else if (country == 'fr') {
  //     // SHOPFULLY FRANCE
  //     config = fr_fr_dc
  //   } else if (country == 'au') {
  //     // SHOPFULLY AUSTRALIA
  //     config = en_au_dc
  //   } else if (country == 'es') {
  //     // SHOPFULLY AUSTRALIA
  //     config = es_es_dc
  //   } else if (country == 'pt') {
  //     // SHOPFULLY AUSTRALIA
  //     config = pt_pt_td
  //   } else if (country == 'it') {
  //     // SHOPFULLY AUSTRALIA
  //     config = it_it_dc
  //   }
  // }

  if (host) {
    if (host.includes('localhost')) {
      // LOCALHOST
      config = localhost
    } else if (host.includes('dev-poc-store-announcement-format.shopfully.cloud') || host.includes('staging-ssr')) {
      // STAGING
      config = stg
    } else if (host.includes('pre-prod-ssr')) {
      // PRE-PROD IT
      config = it_it_dc
    } else if (host.includes('next.tiendeo.com.br')) {
      // TIENDEO BRAZIL
      config = pt_br_td
    } else if (host.includes('next.shopfully.com.br')) {
      // SHOPFULLY BRAZIL
      config = pt_br_dc
    } else if (host.includes('next.tiendeo.mx')) {
      // TIENDEO MEXICO
      config = es_mx_td
    } else if (host.includes('next.dondeahorro.mx.com') || host.includes('next.dondelocompro.mx')) {
      // SHOPFULLY MEXICO
      config = es_mx_dc
    } else if (host.includes('next.tiendeo.fr')) {
      // TIENDEO FRANCE
      config = fr_fr_td
      // can probably remove the check on href for FRANCE as it is not using .com.fr but directly .fr
    } else if (host.includes('next.shopfully.fr')) {
      // SHOPFULLY FRANCE
      config = fr_fr_dc
    } else if (host.includes('next.tiendeo.pt')) {
      // TIENDEO PORTUGAL
      config = pt_pt_td
    } else if (host.includes('next.tiendeo.com.au')) {
      // TIENDEO AUSTRALIA
      config = en_au_td
    } else if (host.includes('next.shopfully.com.au')) {
      // SHOPFULLY AUSTRALIA
      config = en_au_dc
    } else if (host.includes('storeannouncement.doveconviene.it') || host.includes('next.doveconviene.it')) {
      // SHOPFULLY ITALY
      config = it_it_dc
    } else if (host.includes('next.tiendeo.it')) {
      // TIENDEO ITALY
      config = it_it_td
    } else if (host.includes('storeannouncement.promoqui.it') || host.includes('next.promoqui.it')) {
      // PROMOQUI ITALY
      config = it_it_pq
    } else if (host.includes('storeannouncement.volantinofacile.it') || host.includes('next.volantinofacile.it')) {
      // VOLANTINO FACILE ITALY
      config = it_it_vf
    } else if (host.includes('next.tiendeo.cl')) {
      // TIENDEO CHILE
      config = es_cl_td
    } else if (host.includes('next.tiendeo.com.ar')) {
      // TIENDEO ARGENTINA
      config = es_ar_td
    } else if (host.includes('next.tiendeo.com.co')) {
      // TIENDEO COLOMBIA
      config = es_co_td
    } else if (host.includes('next.tiendeo.co.za')) {
      // TIENDEO SOUTH AFRICA
      config = en_za_td
    } else if (host.includes('next.tiendeo.be')) {
      // TIENDEO BELGIUM
      config = fr_be_td
    } else if (host.includes('next.tiendeo.pe')) {
      // TIENDEO PERU
      config = es_pe_td
    } else if (host.includes('next.tiendeo.com.ec')) {
      // TIENDEO ECUADOR
      config = es_ec_td
    } else if (host.includes('shopfully.co.nz')) {
      // SHOPFULLY NEW ZELAND
      config = en_nz_dc
    } else if (host.includes('next.tiendeo.co.nz')) {
      // TIENDEO NEW ZELAND
      config = en_nz_td
    } else if (host.includes('next.tiendeo.com')) {
      // TIENDEO SPAIN
      config = es_es_td
    } else if (host.includes('next.dondetucompras.es')) {
      config = es_es_dc
    }
  }

  return config ?? it_it_dc
}

export { getConfigForCountry }

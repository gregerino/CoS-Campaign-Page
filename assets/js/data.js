window.CAMPAIGN = null;
window.campaignReady = fetch('campaign.json')
  .then(r => r.json())
  .then(data => {
    window.CAMPAIGN = data.campaign;
    return data.campaign;
  });

export default /* @ngInject */ function(restmodProvider, ENV) {
  restmodProvider.rebase(
    'DefaultPacker',
    {
      $config: {
        urlPrefix: ENV.api_url,
        style: 'AMSApi'
      }
    }
  );
}

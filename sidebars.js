module.exports = {
  docs: [
    'introduction',
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: false,
      items: [
        'quick-start',
        {
          "Booting Methods": [
            'booting/usb',
            'booting/iso',
            'booting/ipxe',
            'booting/tftp',
            'booting/vmware',
          ],
        },
      ],
    },
    'selfhosting',
    'contributing',
    'faq',
    {
      type: 'category',
      label: 'Knowledgebase',
      collapsed: true,
      items: [
        { 
          "Networking": [
            'kb/networking/edgerouter',
          ],
        },
        {
          "Provider Usage": [
            'kb/providers/digitalocean',
            'kb/providers/equinixmetal',
            'kb/providers/gce',
            'kb/providers/openstack',
            'kb/providers/vultr',
          ],
        },
        {    
          "PXE Usage": [
              'kb/pxe/ubuntu',
              'kb/pxe/windows',
          ],
        },
      ],
    },
  ],
};
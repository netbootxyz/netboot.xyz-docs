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
            'booting/qemu',
            'booting/tftp',
            'booting/vmware',
          ],
        },
      ],
    },
    'selfhosting',
    {
      type: 'category',
      label: 'Community',
      collapsed: true,
      items: [
        'community/build-automation',
        'changelog',
        'contributing',
	'changelog',
	'community/pipeline-status'
      ],
    },
 'contributing',
    'faq',
    'changelog',
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
